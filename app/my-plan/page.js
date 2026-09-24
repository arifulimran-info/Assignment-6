"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import { usePlan } from "@/components/PlanProvider";
import Stats from "@/components/Stats";
import Spinner from "@/components/Spinner";

export default function MyPlan() {
  const { plan, saved, done, ready, removePlan, removeSaved, markDone } =
    usePlan();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("plan");

  useEffect(() => {
    getWorkouts()
      .then(setAll)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const byIds = (ids) =>
    ids.map((id) => all.find((w) => w.id === id)).filter(Boolean);
  const list = byIds(tab === "plan" ? plan : saved);
  const metrics = [
    ["Exercises", list.length],
    ["Minutes", list.reduce((s, w) => s + w.duration, 0)],
    ["Calories", list.reduce((s, w) => s + w.caloriesBurned, 0)],
  ];

  return (
    <div className="container-x py-10">
      <h1 className="display text-5xl">My Plan</h1>
      <p className="mt-3 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(([label, n]) => (
          <div
            key={label}
            className="rounded-xl border border-line bg-panel p-4 sm:p-6">
            <p className="display text-3xl text-accent sm:text-5xl">{n}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted sm:text-sm">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 border-b border-line" role="tablist">
        {[
          ["plan", "Today's Plan", plan.length],
          ["saved", "Saved", saved.length],
        ].map(([key, label, n]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-4 py-3 font-display text-sm uppercase tracking-wider ${
              tab === key
                ? "border-accent text-accent"
                : "border-transparent text-white/60 hover:text-white"
            }`}>
            {label} ({n})
          </button>
        ))}
      </div>

      {loading || !ready ? (
        <Spinner />
      ) : list.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="display text-3xl">Nothing here yet</h2>
          <p className="mx-auto mt-3 max-w-sm text-muted">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn-primary mt-6">
            Go to workouts
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {list.map((w) => {
            const isDone = done.includes(w.id);
            return (
              <li
                key={w.id}
                className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:flex-row sm:items-center">
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-32"
                />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3
                    className={`display text-xl ${isDone && tab === "plan" ? "text-muted line-through" : ""}`}>
                    {w.name}
                  </h3>
                  <p className="text-sm text-muted">{w.equipment}</p>
                  <Stats w={w} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="btn-outline !px-4 !py-2">
                    View Details
                  </Link>
                  {tab === "plan" && (
                    <button
                      onClick={() => markDone(w)}
                      disabled={isDone}
                      className="btn-primary !px-4 !py-2">
                      <Check className="h-4 w-4" />
                      {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      tab === "plan" ? removePlan(w) : removeSaved(w)
                    }
                    aria-label={`Remove ${w.name}`}
                    className="grid h-10 w-10 place-items-center rounded-md border border-line text-muted hover:border-red-400 hover:text-red-400">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
