import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="display text-8xl text-accent sm:text-9xl">404</p>
        <h1 className="display mt-4 text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">That page skipped leg day and doesn&apos;t exist. Head back to the library.</p>
        <Link href="/" className="btn-primary mt-8">Go to workouts</Link>
      </div>
    </section>
  );
}
