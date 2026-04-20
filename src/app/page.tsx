"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export default function LoginPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("light");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (localStorage.getItem("sp_theme") as Theme | null)) ||
      "light";
    setTheme(stored);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sp_theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  };

  const mono = "font-[JetBrains_Mono,ui-monospace,monospace] [font-variant-numeric:tabular-nums]";
  const linkAccent = "font-semibold text-[var(--red-700)] no-underline hover:underline";

  return (
    <div
      className={cn(
        "login-root min-h-screen font-[Plus_Jakarta_Sans,system-ui,sans-serif] antialiased bg-[var(--bg)] text-[var(--ink)]",
        theme === "dark" && "dark",
      )}
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
        {/* LEFT: Form */}
        <section className="relative flex flex-col px-5 py-6 sm:px-8 sm:py-7 md:px-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF9A7C] px-3 py-2 font-extrabold tracking-[-0.01em] text-white shadow-[0_8px_20px_-10px_rgba(255,107,107,0.65)]">
              <span className="h-[9px] w-[9px] rounded-full bg-white animate-sp-pulse" />
              System Pulse
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-[var(--ink-3)]">
              <span className="hidden sm:inline">Sem conta?</span>
              <a href="#" className={cn(linkAccent, "hidden sm:inline")}>
                Solicitar acesso
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-2 text-xs font-medium text-[var(--ink-2)] hover:bg-[var(--surface-2)]"
                aria-label="Alternar tema"
              >
                {theme === "dark" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                  </svg>
                )}
                <span className="hidden sm:inline">{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
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
                {/* Empresa */}
                <div className="mb-3.5">
                  <label htmlFor="company" className="mb-1.5 block text-xs font-semibold text-[var(--ink-2)]">
                    Empresa
                  </label>
                  <div className="flex items-center rounded-xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--red-400)] focus-within:shadow-[0_0_0_4px_var(--red-50)]">
                    <svg className="ml-3 shrink-0 text-[var(--ink-3)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21V7l9-4 9 4v14" />
                      <path d="M9 21v-6h6v6" />
                      <path d="M9 11h.01M15 11h.01M9 7h.01M15 7h.01" />
                    </svg>
                    <input
                      id="company"
                      type="text"
                      placeholder="Pulse Team"
                      defaultValue="Pulse Team"
                      autoComplete="organization"
                      className="w-full flex-1 border-0 bg-transparent px-3 py-3 font-[inherit] text-sm text-[var(--ink)] outline-0 placeholder:text-[var(--ink-4)]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3.5">
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-[var(--ink-2)]">
                    Email corporativo
                  </label>
                  <div className="flex items-center rounded-xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--red-400)] focus-within:shadow-[0_0_0_4px_var(--red-50)]">
                    <svg className="ml-3 shrink-0 text-[var(--ink-3)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-[var(--ink-2)]">
                    Senha
                  </label>
                  <div className="flex items-center rounded-xl border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--red-400)] focus-within:shadow-[0_0_0_4px_var(--red-50)]">
                    <svg className="ml-3 shrink-0 text-[var(--ink-3)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      className="cursor-pointer border-0 bg-transparent px-2.5 py-0 text-[var(--ink-3)] hover:text-[var(--ink-2)]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-2.5 mb-[22px] flex flex-wrap items-center justify-between gap-3 text-[13px]">
                  <label className="inline-flex cursor-pointer select-none items-center gap-2 text-[var(--ink-2)]">
                    <input type="checkbox" defaultChecked className="peer hidden" />
                    <span className="grid h-[18px] w-[18px] place-items-center rounded-md border-[1.5px] border-[var(--line)] bg-[var(--surface)] transition-[background,border-color] duration-150 peer-checked:border-[var(--red-500)] peer-checked:bg-[var(--red-500)] [&>svg]:hidden peer-checked:[&>svg]:block">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-[var(--red-500)] px-4 py-[13px] text-sm font-bold tracking-[-0.01em] text-white shadow-[0_14px_28px_-12px_rgba(255,107,107,0.65)] transition-[background,transform] duration-150 hover:bg-[var(--red-600)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-90"
                >
                  {submitting ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="9" strokeDasharray="40 20">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar no painel
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

          <div className="flex flex-wrap gap-x-[18px] gap-y-2 pt-[18px] text-[11px] text-[var(--ink-4)]">
            <span>© 2026 System Pulse</span>
            <a href="#" className="hover:text-[var(--ink-2)]">Termos</a>
            <a href="#" className="hover:text-[var(--ink-2)]">Privacidade</a>
            <a href="#" className="hover:text-[var(--ink-2)]">Status</a>
          </div>
        </section>

        {/* RIGHT: Visual side */}
        <aside className="login-side-bg login-side-grid relative hidden flex-col overflow-hidden p-6 text-white md:p-8 lg:flex xl:p-9">
          <div className="relative z-[1] flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 pl-2.5 text-[11px] font-bold uppercase tracking-[0.08em] backdrop-blur-[10px]">
              <span className="h-[7px] w-[7px] rounded-full bg-white animate-sp-pulse-fast" />
              Ao vivo · 12/14 online
            </span>
          </div>

          {/* Floating pills */}
          <div className="absolute right-8 top-20 z-[1] inline-flex items-center gap-2 rounded-[14px] border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold shadow-[0_14px_28px_-12px_rgba(0,0,0,0.3)] backdrop-blur-[10px] animate-sp-bob xl:right-12 xl:top-[110px]">
            <span className="h-2 w-2 rounded-full bg-[#34D399]" />
            api-prod-01 estável
          </div>
          <div className="absolute right-24 top-[140px] z-[1] inline-flex items-center gap-2 rounded-[14px] border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold shadow-[0_14px_28px_-12px_rgba(0,0,0,0.3)] backdrop-blur-[10px] animate-sp-bob-delay xl:right-40 xl:top-[180px]">
            <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
            worker-02 · manutenção
          </div>

          <div className="relative z-[1] my-auto max-w-[520px]">
            <p className="m-0 text-pretty text-[26px] font-bold leading-[1.25] tracking-[-0.02em] sm:text-[28px] lg:text-[28px] xl:text-[32px]">
              Cada batida do seu servidor, em tempo real.
            </p>
            <p className="mt-3.5 max-w-[460px] text-sm leading-[1.55] opacity-85">
              Monitoramento contínuo, alertas inteligentes e visão unificada da
              sua infraestrutura — tudo numa interface que a equipe realmente
              gosta de usar.
            </p>

            <div className="mt-8 max-w-full rounded-[20px] border border-white/25 bg-white/10 p-[18px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-[14px] lg:max-w-[440px]">
              <div className="mb-1.5 flex items-center justify-between">
                <h4 className="m-0 text-[13px] font-bold tracking-[-0.01em]">Status da infraestrutura</h4>
                <span className={cn("text-[11px] opacity-80", mono)}>atualizado há 2s</span>
              </div>

              <svg className="my-1 mb-2 block" width="100%" height="64" viewBox="0 0 400 64" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity=".35" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 46 L20 40 L40 44 L60 32 L80 36 L100 28 L120 34 L140 22 L160 26 L180 18 L200 24 L220 14 L240 20 L260 12 L280 18 L300 10 L320 22 L340 16 L360 24 L380 18 L400 22 L400 64 L0 64 Z" fill="url(#gfill)" />
                <path d="M0 46 L20 40 L40 44 L60 32 L80 36 L100 28 L120 34 L140 22 L160 26 L180 18 L200 24 L220 14 L240 20 L260 12 L280 18 L300 10 L320 22 L340 16 L360 24 L380 18 L400 22" fill="none" stroke="white" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>

              {[
                { lbl: "▲ Uptime (30 dias)", val: "99.94%", tag: "saudável", tone: "ok" as const },
                { lbl: "◆ Latência p95", val: "148 ms", tag: "dentro do SLA", tone: "ok" as const },
                { lbl: "● Incidentes ativos", val: "3", tag: "2 alta sev.", tone: "warn" as const },
              ].map((row, i) => (
                <div
                  key={row.lbl}
                  className={cn(
                    "flex items-center justify-between gap-4 py-2.5",
                    i > 0 && "border-t border-dashed border-white/25",
                    i === 0 && "pt-0",
                  )}
                >
                  <div className="flex items-center gap-2 text-xs opacity-85">{row.lbl}</div>
                  <div className={cn("text-[18px] font-bold tracking-[-0.01em]", mono)}>{row.val}</div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-bold",
                      row.tone === "ok" && "bg-[rgba(52,211,153,0.28)]",
                      row.tone === "warn" && "bg-[rgba(251,191,36,0.28)]",
                    )}
                  >
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[1] mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
            <small className="text-[15px] opacity-70">Confiado por 140+ equipes de engenharia</small>
          </div>
        </aside>
      </div>
    </div>
  );
}
