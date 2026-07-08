"use client";

// Minimal toast system (context + portal), styled to match the site design
// (ivory/navy/lime, rounded pills, framer-motion). No external deps.

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiAlertCircle, FiX } from "react-icons/fi";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = ++counter;
      setToasts((t) => [...t, { id, type, message }]);
      setTimeout(() => remove(id), 4500);
    },
    [remove]
  );

  const success = useCallback((m: string) => toast(m, "success"), [toast]);
  const error = useCallback((m: string) => toast(m, "error"), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] flex flex-col items-center gap-2 px-4 sm:top-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-sand bg-white px-4 py-3 shadow-[0_30px_80px_-40px_rgba(4,52,96,0.6)]"
            >
              <span
                className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full ${
                  t.type === "success"
                    ? "bg-lime text-navy"
                    : t.type === "error"
                    ? "bg-red-100 text-red-600"
                    : "bg-beige text-navy"
                }`}
              >
                {t.type === "error" ? (
                  <FiAlertCircle size={14} />
                ) : (
                  <FiCheck size={14} />
                )}
              </span>
              <p className="flex-1 text-[14px] text-navy">{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                aria-label="Dismiss"
                className="grid h-6 w-6 flex-none place-items-center rounded-full text-navy/40 hover:bg-beige hover:text-navy"
              >
                <FiX size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
