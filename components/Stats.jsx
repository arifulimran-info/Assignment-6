import { Clock, Flame, Star } from "lucide-react";

export default function Stats({ w }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1.5"><Flame className="h-4 w-4 text-accent" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-accent" />{w.rating}</span>
    </div>
  );
}
