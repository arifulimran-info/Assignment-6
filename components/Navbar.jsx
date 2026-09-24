"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const onWorkout = path === "/" || path.startsWith("/workout");
  const onPlan = path.startsWith("/my-plan");
  const link = (active) =>
    `border-b-2 px-1 pb-1 font-display text-sm uppercase tracking-wider transition ${
      active
        ? "border-accent text-accent"
        : "border-transparent text-white/70 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <nav className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog home">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-5 w-auto object-contain"
          />
          <span className="font-display text-xl font-bold tracking-wider">
            FITLOG
          </span>
        </Link>

        <div className="order-3 flex w-full justify-center gap-8 md:order-none md:w-auto">
          <Link href="/" className={link(onWorkout)}>
            Workout
          </Link>
          <Link href="/my-plan" className={link(onPlan)}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
            Plan <span className="ml-1">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-white/40 px-3 py-1 text-xs font-bold hover:border-accent">
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
