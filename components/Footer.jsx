import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-panel">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-black"><Dumbbell className="h-4 w-4" /></span>
          <span className="font-display text-lg font-bold tracking-wider">FITLOG</span>
        </div>
        <p className="text-sm text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
