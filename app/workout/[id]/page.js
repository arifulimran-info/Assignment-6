"use client";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { PLAN_CAP, usePlan } from "@/components/PlanProvider";
import Spinner from "@/components/Spinner";

export default function WorkoutDetail() {
  const { id } = useParams();
  const [w, setW] = useState(null);
  const [state, setState] = useState("loading");
  const { plan, saved, addToPlan, save } = usePlan();

  useEffect(() => {
    getWorkout(id).then((d) => { setW(d); setState(d ? "ok" : "missing"); }).catch(() => setState("missing"));
  }, [id]);

  if (state === "loading") return <Spinner label="Loading workout…" />;
  if (state === "missing") notFound();

  const inPlan = plan.includes(w.id);
  const full = plan.length >= PLAN_CAP && !inPlan;
  const specs = [
    ["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps],
    ["Duration", `${w.duration} min`], ["Calories", `${w.caloriesBurned} kcal`], ["Rating", w.rating],
  ];

  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-line bg-panel lg:sticky lg:top-24 lg:self-start">
        <img src={w.image} alt={w.name} className="aspect-square w-full object-cover" />
      </div>

      <div>
        <h1 className="display text-4xl sm:text-5xl">{w.name}</h1>
        <p className="mt-4 text-lg text-muted">{w.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}</div>

        <h2 className="display mt-8 text-xl text-accent">Key specs</h2>
        <dl className="mt-3 divide-y divide-line rounded-xl border border-line bg-panel">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
              <dt className="font-semibold uppercase tracking-wider text-muted">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="display mt-8 text-xl text-accent">Instructions</h2>
        <ol className="mt-3 space-y-3">
          {w.instructions.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-black">{i + 1}</span>
              <span className="pt-0.5 text-white/90">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => addToPlan(w)} disabled={full} className="btn-primary">
            <Plus className="h-4 w-4" />{full ? "Plan is full" : inPlan ? "In today's plan" : "Add to today's plan"}
          </button>
          <button onClick={() => save(w)} className="btn-outline">
            <Bookmark className="h-4 w-4" />{saved.includes(w.id) ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
