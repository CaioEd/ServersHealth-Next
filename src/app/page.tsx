"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "@/components/forms/login-form";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");

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

  const mono =
    "font-[JetBrains_Mono,ui-monospace,monospace] [font-variant-numeric:tabular-nums]";

  return (
    <div
      className={cn(
        "login-root min-h-screen font-[Plus_Jakarta_Sans,system-ui,sans-serif] antialiased bg-[var(--bg)] text-[var(--ink)]",
        theme === "dark" && "dark"
      )}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
        {/* LEFT: Form */}
        <LoginForm theme={theme} onToggleTheme={toggleTheme} />

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
                <h4 className="m-0 text-[13px] font-bold tracking-[-0.01em]">
                  Status da infraestrutura
                </h4>
                <span className={cn("text-[11px] opacity-80", mono)}>
                  atualizado há 2s
                </span>
              </div>

              <svg
                className="my-1 mb-2 block"
                width="100%"
                height="64"
                viewBox="0 0 400 64"
                preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity=".35" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 46 L20 40 L40 44 L60 32 L80 36 L100 28 L120 34 L140 22 L160 26 L180 18 L200 24 L220 14 L240 20 L260 12 L280 18 L300 10 L320 22 L340 16 L360 24 L380 18 L400 22 L400 64 L0 64 Z"
                  fill="url(#gfill)"
                />
                <path
                  d="M0 46 L20 40 L40 44 L60 32 L80 36 L100 28 L120 34 L140 22 L160 26 L180 18 L200 24 L220 14 L240 20 L260 12 L280 18 L300 10 L320 22 L340 16 L360 24 L380 18 L400 22"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>

              {[
                {
                  lbl: "▲ Uptime (30 dias)",
                  val: "99.94%",
                  tag: "saudável",
                  tone: "ok" as const,
                },
                {
                  lbl: "◆ Latência p95",
                  val: "148 ms",
                  tag: "dentro do SLA",
                  tone: "ok" as const,
                },
                {
                  lbl: "● Incidentes ativos",
                  val: "3",
                  tag: "2 alta sev.",
                  tone: "warn" as const,
                },
              ].map((row, i) => (
                <div
                  key={row.lbl}
                  className={cn(
                    "flex items-center justify-between gap-4 py-2.5",
                    i > 0 && "border-t border-dashed border-white/25",
                    i === 0 && "pt-0"
                  )}>
                  <div className="flex items-center gap-2 text-xs opacity-85">
                    {row.lbl}
                  </div>
                  <div
                    className={cn(
                      "text-[18px] font-bold tracking-[-0.01em]",
                      mono
                    )}>
                    {row.val}
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-bold",
                      row.tone === "ok" && "bg-[rgba(52,211,153,0.28)]",
                      row.tone === "warn" && "bg-[rgba(251,191,36,0.28)]"
                    )}>
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[1] mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
            <small className="text-[15px] opacity-70">
              Confiado por 140+ equipes de engenharia
            </small>
          </div>
        </aside>
      </div>
    </div>
  );
}
