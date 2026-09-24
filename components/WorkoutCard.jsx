import Link from "next/link";
import Stats from "./Stats";

export default function WorkoutCard({ w }) {
  return (
    <Link href={`/workout/${w.id}`}
      className="group block overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent">
      <div className="aspect-[4/3] overflow-hidden bg-line">
        <img src={w.image} alt={w.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}
        </div>
        <h3 className="display text-xl">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <Stats w={w} />
      </div>
    </Link>
  );
}
