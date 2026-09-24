"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

export const PLAN_CAP = 5;
const KEY = "fitlog:v1";
const Ctx = createContext(null);
export const usePlan = () => useContext(Ctx);

export default function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]); // workout ids
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      setPlan(s.plan || []); setSaved(s.saved || []); setDone(s.done || []);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ plan, saved, done })); } catch {}
  }, [plan, saved, done, ready]);

  const notify = useCallback((msg, type = "success") => {
    setToast({ msg, type, k: Date.now() });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToPlan = (w) => {
    if (plan.includes(w.id)) return notify(`${w.name} is already in today's plan`, "info");
    if (plan.length >= PLAN_CAP) return notify(`Plan is full — ${PLAN_CAP} lifts max`, "error");
    setPlan([...plan, w.id]);
    notify(`Added ${w.name} to today's plan`);
  };
  const save = (w) => {
    if (saved.includes(w.id)) return notify(`${w.name} is already saved`, "info");
    setSaved([...saved, w.id]);
    notify(`Saved ${w.name} for later`);
  };
  const removePlan = (w) => {
    setPlan(plan.filter((i) => i !== w.id));
    setDone(done.filter((i) => i !== w.id));
    notify(`Removed ${w.name} from today's plan`, "info");
  };
  const removeSaved = (w) => {
    setSaved(saved.filter((i) => i !== w.id));
    notify(`Removed ${w.name} from saved`, "info");
  };
  const markDone = (w) => {
    if (done.includes(w.id)) return;
    setDone([...done, w.id]);
    notify(`${w.name} marked as done`);
  };

  const Icon = toast?.type === "error" ? XCircle : toast?.type === "info" ? Info : CheckCircle2;
  const color = toast?.type === "error" ? "text-red-400" : toast?.type === "info" ? "text-sky-300" : "text-accent";

  return (
    <Ctx.Provider value={{ plan, saved, done, ready, addToPlan, save, removePlan, removeSaved, markDone }}>
      {children}
      {toast && (
        <div key={toast.k} role="status" aria-live="polite"
          className="toast-in fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-lg border border-line bg-panel px-4 py-3 shadow-xl">
          <Icon className={`h-5 w-5 shrink-0 ${color}`} />
          <span className="text-sm">{toast.msg}</span>
        </div>
      )}
    </Ctx.Provider>
  );
}
