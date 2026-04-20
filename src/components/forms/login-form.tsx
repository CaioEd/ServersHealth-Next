"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SquareActivityIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

type LoginFormProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function LoginForm({ theme, onToggleTheme }: LoginFormProps) {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  };

  const linkAccent =
    "font-semibold text-[var(--red-700)] no-underline hover:underline";

  return (
    <section className="relative flex flex-col px-5 py-6 sm:px-8 sm:py-7 md:px-10">
      <div className="flex flex-wrap items-center gap-2.5">
        <a href="#" className="flex items-center gap-2">
          <SquareActivityIcon className="!size-7" />
          <span className="text-[20px] font-bold">System Pulse</span>
        </a>
        <div className="ml-auto flex items-center gap-2 text-xs text-[var(--ink-3)]">
          <span className="hidden sm:inline">Sem conta?</span>
          <a href="#" className={cn(linkAccent, "hidden sm:inline")}>
            Solicitar acesso
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-2 text-xs font-medium text-[var(--ink-2)] hover:bg-[var(--surface-2)]"
            aria-label="Alternar tema">
            {theme === "dark" ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
            <span className="hidden sm:inline">
              {theme === "dark" ? "Modo claro" : "Modo escuro"}
            </span>
          </button>
        </div>
      </div>

      <div className="grid flex-1 place-items-center py-8 sm:py-10">
        <div className="w-full max-w-[420px]">
          <h1 className="mt-3.5 mb-2 text-pretty text-[26px] font-extrabold tracking-[-0.03em] sm:text-[30px] md:text-[34px]">
            Bem-vindo de volta 👋
          </h1>
          <p className="mb-6 text-sm leading-[1.55] text-[var(--ink-3)]">
            Entre para acompanhar a saúde dos seus servidores em tempo real.
          </p>

          <form onSubmit={submitForm}>
            {/* Email */}
            <div className="mb-3.5">
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-[var(--ink-2)]">
                Email corporativo
              </label>
              <div className="flex items-center rounded-xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--red-400)] focus-within:shadow-[0_0_0_4px_var(--red-50)]">
                <svg
                  className="ml-3 shrink-0 text-[var(--ink-3)]"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="lucas@pulseteam.com"
                  defaultValue="lucas@pulseteam.com"
                  autoComplete="email"
                  className="w-full flex-1 border-0 bg-transparent px-3 py-3 font-[inherit] text-sm text-[var(--ink)] outline-0 placeholder:text-[var(--ink-4)]"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="mb-3.5">
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-[var(--ink-2)]">
                Senha
              </label>
              <div className="flex items-center rounded-xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--red-400)] focus-within:shadow-[0_0_0_4px_var(--red-50)]">
                <svg
                  className="ml-3 shrink-0 text-[var(--ink-3)]"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••••"
                  defaultValue="supersecret"
                  autoComplete="current-password"
                  className="w-full flex-1 border-0 bg-transparent px-3 py-3 font-[inherit] text-sm text-[var(--ink)] outline-0 placeholder:text-[var(--ink-4)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label="Mostrar senha"
                  className="cursor-pointer border-0 bg-transparent px-2.5 py-0 text-[var(--ink-3)] hover:text-[var(--ink-2)]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-2.5 mb-[22px] flex flex-wrap items-center justify-between gap-3 text-[13px]">
              <label className="inline-flex cursor-pointer select-none items-center gap-2 text-[var(--ink-2)]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="peer hidden"
                />
                <span className="grid h-[18px] w-[18px] place-items-center rounded-md border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[background,border-color] duration-150 peer-checked:border-[var(--red-500)] peer-checked:bg-[var(--red-500)] [&>svg]:hidden peer-checked:[&>svg]:block">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Manter-me conectado
              </label>
              <a href="#" className={linkAccent}>
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-[var(--red-500)] px-4 py-[13px] text-sm font-bold tracking-[-0.01em] text-white shadow-[0_14px_28px_-12px_rgba(255,107,107,0.65)] transition-[background,transform] duration-150 hover:bg-[var(--red-600)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-90">
              {submitting ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" strokeDasharray="40 20">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-[22px] text-center text-[13px] text-[var(--ink-3)]">
            Primeira vez?{" "}
            <a href="#" className={linkAccent}>
              Criar conta da equipe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
