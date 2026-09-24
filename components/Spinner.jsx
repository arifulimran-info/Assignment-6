export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-muted" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
