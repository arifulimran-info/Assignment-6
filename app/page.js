"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Dumbbell, Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import Spinner from "@/components/Spinner";

const SORTS = { Duration: "duration", Calories: "caloriesBurned", Rating: "rating" };

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("Duration");
  const [q, setQ] = useState("");

  useEffect(() => {
    getWorkouts().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items
      .filter((w) => !term || w.name.toLowerCase().includes(term) || w.muscleGroups.some((m) => m.toLowerCase().includes(term)))
      .sort((a, b) => b[SORTS[sort]] - a[SORTS[sort]]); // high → low
  }, [items, sort, q]);

  return (
    <>
      <section className="container-x grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Workout Library
          </p>
          <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <a href="#library" className="btn-primary mt-8">
            <Dumbbell className="h-4 w-4" />
            Browse workouts
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-panel">
          <img
            src="/banner.png"
            alt="Cartoon athlete lifting"
            className="aspect-[4/4] h-auto w-auto object-cover"
          />
        </div>
      </section>

      <section id="library" className="container-x scroll-mt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display text-4xl">The Library</h2>
            <p className="mt-2 text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or muscle"
                className="w-full rounded-md border border-line bg-panel py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent sm:w-56"
              />
            </label>
            <label className="relative flex items-center gap-2 text-sm text-muted">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-md border border-line bg-panel py-2.5 pl-3 pr-9 text-white outline-none focus:border-accent">
                {Object.keys(SORTS).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4" />
            </label>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="py-20 text-center text-red-400">
            {error}. Please refresh to try again.
          </p>
        ) : list.length === 0 ? (
          <p className="py-20 text-center text-muted">
            No lifts match &ldquo;{q}&rdquo;.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => (
              <WorkoutCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
