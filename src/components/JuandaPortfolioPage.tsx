import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Cpu,
  Github,
  Globe,
  Moon,
  PenSquare,
  Radar,
  Sun,
  Workflow,
  Zap,
} from "lucide-react";

const featuredProjects = [
  {
    name: "LearningML",
    description:
      "Plataforma educativa para ensenar inteligencia artificial en el aula de forma comprensible y creativa.",
    tag: "IA educativa",
    url: "https://learningml.org",
  },
  {
    name: "EchidnaML",
    description:
      "Software y ecosistema para robotica educativa y experimentacion con programacion creativa.",
    tag: "Robotica",
    url: "#",
  },
  {
    name: "LearningML Editor",
    description:
      "Editor visual basado en web components para crear experiencias de IA educativa.",
    tag: "Software",
    url: "#",
  },
];

const curatedFallbackProjects = [
  {
    name: "babel",
    description: "Gestor de bibliotecas personal.",
    language: "JavaScript / Electron",
    updated: "2026-03-09",
    html_url: "https://github.com/juanda/babel",
  },
  {
    name: "qr-generator",
    description: "Generador web de codigos QR.",
    language: "JavaScript",
    updated: "2026-02-21",
    html_url: "https://github.com/juanda/qr-generator",
    app_url: "https://juanda.github.io/qr-generator/",
  },
  {
    name: "polacalc",
    description: "Calculadora y experimento web.",
    language: "JavaScript",
    updated: "2026-02-20",
    html_url: "https://github.com/juanda/polacalc",
    app_url: "https://juanda.github.io/polacalc/",
  },
  {
    name: "radios",
    description: "Experimento web con interfaces y audio.",
    language: "JavaScript",
    updated: "2026-02-10",
    html_url: "https://github.com/juanda/radios",
    app_url: "https://juanda.github.io/radios/",
  },
  {
    name: "bub",
    description: "Juego inspirado en Bubble Bobble generado con IA.",
    language: "JavaScript",
    updated: "2026-01-18",
    html_url: "https://github.com/juanda/bub",
    app_url: "https://juanda.github.io/bub/",
  },
  {
    name: "futbol-ciro",
    description: "Juego de futbol experimental.",
    language: "JavaScript",
    updated: "2026-02-14",
    html_url: "https://github.com/juanda/futbol-ciro",
    app_url: "https://juanda.github.io/futbol-ciro/",
  },
];

const curatedProjectOrder = [
  "babel",
  "qr-generator",
  "polacalc",
  "radios",
  "bub",
  "futbol-ciro",
];

const pillars = [
  {
    icon: BookOpen,
    title: "Tecnologia que ensena",
    text: "Diseno herramientas para aprender programacion e inteligencia artificial de forma comprensible y creativa.",
  },
  {
    icon: Cpu,
    title: "Ingenieria con proposito",
    text: "Construyo software, automatizacion e infraestructura pensando en sostenibilidad y claridad.",
  },
  {
    icon: PenSquare,
    title: "Explicar lo complejo",
    text: "Traduzco sistemas complejos en ideas comprensibles.",
  },
];

const writings = [
  {
    title: "IA y alfabetizacion tecnologica",
    description:
      "Como ensenar inteligencia artificial evitando tanto el hype como la simplificacion.",
  },
  {
    title: "Programar para pensar",
    description:
      "El pensamiento computacional como forma de modelar el mundo.",
  },
  {
    title: "Software publico",
    description:
      "Como construir proyectos tecnologicos sostenibles en instituciones.",
  },
];

const nowItems = [
  {
    icon: Activity,
    title: "Ahora mismo",
    text: "Impulsando proyectos de software educativo, IA aplicada al aprendizaje y arquitectura tecnologica con vocacion publica.",
  },
  {
    icon: Zap,
    title: "En foco",
    text: "LearningML, automatizacion de despliegues, sostenibilidad tecnica y diseno de recursos educativos digitales.",
  },
  {
    icon: Radar,
    title: "Explorando",
    text: "Modelos generativos, alfabetizacion en IA, hardware educativo y nuevas formas de ensenar tecnologia avanzada.",
  },
  {
    icon: Workflow,
    title: "Modo de trabajo",
    text: "Pensar, construir, documentar y convertir complejidad en herramientas utilizables y comprensibles.",
  },
];

const focusItems = [...nowItems, ...pillars];

type Repo = {
  id?: number;
  name: string;
  description?: string;
  language?: string;
  updated?: string;
  updated_at?: string;
  html_url: string;
  app_url?: string;
  fork?: boolean;
};

function formatDate(date?: string) {
  if (!date) return "n/a";
  try {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function buildCuratedGithubProjects(repos: Repo[]) {
  return curatedProjectOrder
    .map((name) => {
      const liveRepo = repos.find((repo) => repo.name === name);
      const fallbackRepo = curatedFallbackProjects.find((repo) => repo.name === name);

      return liveRepo
        ? {
            ...fallbackRepo,
            ...liveRepo,
          }
        : fallbackRepo;
    })
    .filter((repo): repo is Repo => Boolean(repo));
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transform transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function ShellPrompt({
  theme,
  path,
  command,
  blinking = false,
}: {
  theme: "dark" | "light";
  path: string;
  command: string;
  blinking?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${
        theme === "dark" ? "text-emerald-200/70" : "text-slate-600"
      }`}
    >
      <span className={theme === "dark" ? "text-emerald-300" : "text-slate-900"}>
        juanda@portfolio
      </span>
      <span className={theme === "dark" ? "text-emerald-500/80" : "text-slate-400"}>:</span>
      <span className={theme === "dark" ? "text-emerald-300" : "text-slate-900"}>
        {path}
      </span>
      <span className={theme === "dark" ? "text-emerald-500/80" : "text-slate-400"}>$</span>
      <span>{command}</span>
      {blinking ? (
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-2 rounded-sm animate-pulse ${
            theme === "dark" ? "bg-emerald-300/90" : "bg-slate-700"
          }`}
        />
      ) : null}
    </div>
  );
}

function WindowHeader({
  theme,
  title = "juanda@portfolio:~",
}: {
  theme: "dark" | "light";
  title?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between border-b px-4 py-3 text-xs ${
        theme === "dark"
          ? "border-emerald-500/20 bg-black/40 text-emerald-300"
          : "border-slate-300 bg-slate-100 text-slate-700"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="tracking-wide">{title}</div>
      <div className="opacity-60">MONOSPACE MODE</div>
    </div>
  );
}

function TerminalCard({
  children,
  theme,
  className = "",
}: {
  children: React.ReactNode;
  theme: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border ${className} ${
        theme === "dark"
          ? "border-emerald-500/20 bg-[#07110d]"
          : "border-slate-300 bg-white"
      }`}
    >
      {children}
    </div>
  );
}

function RepoCard({ repo, theme }: { repo: Repo; theme: "dark" | "light" }) {
  return (
    <div
      className={`group block h-full rounded-[1.25rem] border p-5 transition duration-300 hover:-translate-y-1 ${
        theme === "dark"
          ? "border-emerald-500/20 bg-black/30 hover:border-emerald-400/40"
          : "border-slate-300 bg-white hover:border-slate-500"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`text-[10px] uppercase tracking-[0.22em] ${
              theme === "dark" ? "text-emerald-400/70" : "text-slate-500"
            }`}
          >
            repo
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-lg font-semibold hover:underline"
          >
            {repo.name}
          </a>
        </div>
        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p
        className={`mt-4 text-sm leading-7 ${
          theme === "dark" ? "text-slate-300" : "text-slate-700"
        }`}
      >
        {repo.description || "Repositorio publico disponible en GitHub."}
      </p>

      <div
        className={`mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-xs ${
          theme === "dark"
            ? "border-emerald-500/15 text-slate-400"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <div>
          <div className="opacity-70">lang</div>
          <div className="mt-1">{repo.language || "n/a"}</div>
        </div>
        <div className="text-right">
          <div className="opacity-70">updated</div>
          <div className="mt-1">{formatDate(repo.updated_at || repo.updated)}</div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center rounded-md border px-3 py-1.5 ${
            theme === "dark"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border-slate-300 bg-slate-50 text-slate-700"
          }`}
        >
          github
        </a>
        {repo.app_url ? (
          <a
            href={repo.app_url}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center rounded-md border px-3 py-1.5 ${
              theme === "dark"
                ? "border-emerald-500/20 bg-black/40 text-emerald-200"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            abrir app
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function JuandaPortfolioPage() {
  const [githubProjects, setGithubProjects] = useState<Repo[]>(curatedFallbackProjects);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    fetch("https://api.github.com/users/juanda/repos?sort=updated&per_page=6")
      .then((response) => response.json())
      .then((repos: Repo[] | unknown) => {
        const filtered = Array.isArray(repos)
          ? buildCuratedGithubProjects((repos as Repo[]).filter((repo) => !repo.fork))
          : [];

        if (filtered.length) {
          setGithubProjects(filtered);
        }
      })
      .catch(() => {
        // Fallback already loaded in state.
      });
  }, []);

  const heroTags = useMemo(
    () => ["educacion", "software", "ia", "infraestructura"],
    []
  );

  const appTheme =
    theme === "dark"
      ? "bg-[#020805] text-[#d7ffe9]"
      : "bg-[#f4f1e8] text-slate-900";
  const sectionSurface =
    theme === "dark"
      ? "border-emerald-500/20 bg-[#07110d]"
      : "border-slate-300 bg-[#fffdf8]";
  const cardSurface =
    theme === "dark"
      ? "border-emerald-500/20 bg-black/30"
      : "border-slate-300 bg-white";
  const mutedText = theme === "dark" ? "text-emerald-200/60" : "text-slate-600";
  const softText = theme === "dark" ? "text-slate-300" : "text-slate-700";

  return (
    <div className={`min-h-screen font-mono ${appTheme}`}>
      <div
        className={`pointer-events-none fixed inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_30%),linear-gradient(to_bottom,rgba(2,8,5,0.98),rgba(2,8,5,1))]"
            : "bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.12),transparent_28%),linear-gradient(to_bottom,rgba(244,241,232,1),rgba(244,241,232,1))]"
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 opacity-20 ${
            theme === "dark"
              ? "bg-[linear-gradient(rgba(16,185,129,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.028)_1px,transparent_1px)] bg-[size:32px_32px]"
              : "bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
          }`}
        />

        <div className="relative mb-6 flex items-center justify-between text-sm">
          <div className={mutedText}>juandarodriguez.es</div>

          <div className="flex gap-3">
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className={`rounded-md border px-3 py-1.5 ${
                theme === "dark"
                  ? "border-emerald-500/20 bg-black/30"
                  : "border-slate-300 bg-white"
              }`}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`rounded-md border px-3 py-1.5 ${
                theme === "dark"
                  ? "border-emerald-500/20 bg-black/30"
                  : "border-slate-300 bg-white"
              }`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        <Reveal>
          <TerminalCard theme={theme}>
            <WindowHeader theme={theme} title="juanda@portfolio:~/intro" />
            <section className="relative p-8 md:p-10 lg:p-12">
              <div
                className={`pointer-events-none absolute inset-0 opacity-40 ${
                  theme === "dark"
                    ? "bg-[linear-gradient(rgba(16,185,129,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.035)_1px,transparent_1px)] bg-[size:28px_28px]"
                    : "bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px]"
                }`}
              />

              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {heroTags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border px-2 py-1 text-xs ${
                          theme === "dark"
                            ? "border-emerald-500/20 bg-black/30 text-emerald-300"
                            : "border-slate-300 bg-white text-slate-700"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`mt-5 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${
                      theme === "dark"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    status: available for meaningful projects
                  </div>

                  <div className="mt-6">
                    <ShellPrompt theme={theme} path="~" command="whoami" blinking />
                  </div>

                  <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                    Juanda
                  </h1>

                  <p
                    className={`mt-6 text-lg leading-8 ${
                      theme === "dark" ? "text-emerald-50" : "text-slate-800"
                    }`}
                  >
                    Construyo tecnologia educativa y proyectos digitales donde la
                    ingenieria y el aprendizaje se encuentran.
                  </p>

                  <p className={`mt-5 max-w-2xl leading-8 ${mutedText}`}>
                    Desarrollo software, diseno herramientas para aprender y trabajo en la
                    infraestructura, la documentacion y la estrategia que hacen que los
                    proyectos tengan sentido, duren y puedan crecer.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3 text-sm">
                    <a
                      href="#proyectos"
                      className={`rounded-md border px-4 py-2.5 transition hover:-translate-y-0.5 ${
                        theme === "dark"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                          : "border-slate-300 bg-slate-900 text-white"
                      }`}
                    >
                      ./projects
                    </a>
                    <a
                      href="#now"
                      className={`rounded-md border px-4 py-2.5 transition hover:-translate-y-0.5 ${
                        theme === "dark"
                          ? "border-emerald-500/20 bg-black/30"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      ./now
                    </a>
                    <a
                      href="/cv"
                      className={`rounded-md border px-4 py-2.5 transition hover:-translate-y-0.5 ${
                        theme === "dark"
                          ? "border-emerald-500/20 bg-black/30"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      ./cv
                    </a>
                    <a
                      href="https://github.com/juanda"
                      className={`rounded-md border px-4 py-2.5 transition hover:-translate-y-0.5 ${
                        theme === "dark"
                          ? "border-emerald-500/20 bg-black/30"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      github
                    </a>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div
                    className={`w-full max-w-md rounded-[1.5rem] border p-5 shadow-2xl ${
                      theme === "dark"
                        ? "border-emerald-500/20 bg-black/40"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between border-b pb-3 text-xs ${
                        theme === "dark"
                          ? "border-emerald-500/15 text-emerald-300"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <span>profile-card.js</span>
                      <span>readonly</span>
                    </div>

                    <div className="space-y-4 pt-5 text-sm leading-7">
                      <div>
                        <div className={mutedText}>role</div>
                        <div className="mt-1">educator / developer / project lead</div>
                      </div>
                      <div>
                        <div className={mutedText}>focus</div>
                        <div className="mt-1">
                          edtech, ai literacy, devops, public digital projects
                        </div>
                      </div>
                      <div>
                        <div className={mutedText}>style</div>
                        <div className="mt-1">clear systems, useful tools, durable work</div>
                      </div>
                      <div>
                        <div className={mutedText}>motto</div>
                        <div className={`mt-1 ${theme === "dark" ? "text-emerald-300" : "text-slate-900"}`}>
                          "technology should teach, not only execute"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TerminalCard>
        </Reveal>

        <Reveal delay={80} className="mt-20">
          <TerminalCard theme={theme}>
            <WindowHeader theme={theme} title="juanda@portfolio:~/featured" />
            <section className="p-8 md:p-10">
              <div className="mb-3">
                <ShellPrompt theme={theme} path="~/featured" command="ls projects" />
              </div>
              <div className={`text-xs uppercase tracking-[0.24em] ${mutedText}`}>
                selected work
              </div>
              <h2 className="mt-3 mb-6 text-3xl font-semibold">Proyectos destacados</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {featuredProjects.map((project) => (
                  <a
                    key={project.name}
                    href={project.url}
                    className={`rounded-[1.25rem] border p-6 transition duration-300 hover:-translate-y-1 ${cardSurface} ${
                      theme === "dark" ? "hover:border-emerald-400/40" : "hover:border-slate-500"
                    }`}
                  >
                    <div className={`text-[10px] uppercase tracking-[0.2em] ${mutedText}`}>
                      {project.tag}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{project.name}</h3>
                    <p className={`mt-3 text-sm leading-7 ${softText}`}>
                      {project.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </TerminalCard>
        </Reveal>

        <Reveal delay={120} className="mt-20">
          <TerminalCard theme={theme}>
            <WindowHeader theme={theme} title="juanda@portfolio:~/now" />
            <section id="now" className="p-8 md:p-10">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-3">
                    <ShellPrompt theme={theme} path="~/now" command="cat now-and-work.txt" />
                  </div>
                  <div className={`text-xs uppercase tracking-[0.24em] ${mutedText}`}>
                    current focus
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold">En que estoy y como trabajo</h2>
                </div>
                <div className={`max-w-xl text-sm leading-7 ${mutedText}`}>
                  Una sola vista de mis focos actuales y de las lineas de trabajo que
                  estructuran lo que construyo: producto educativo, ingenieria,
                  explicacion y sostenibilidad tecnica.
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {focusItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={150 + index * 80} className="h-full">
                      <div className={`h-full rounded-[1.25rem] border p-6 ${cardSurface}`}>
                        <div
                          className={`inline-flex rounded-md border p-3 ${
                            theme === "dark"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                              : "border-slate-300 bg-slate-50 text-slate-700"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                        <p className={`mt-3 text-sm leading-7 ${softText}`}>{item.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          </TerminalCard>
        </Reveal>

        <Reveal delay={220} className="mt-20">
          <TerminalCard theme={theme}>
            <WindowHeader theme={theme} title="juanda@portfolio:~/ideas" />
            <section className="p-8 md:p-10">
              <div className="mb-3">
                <ShellPrompt theme={theme} path="~/ideas" command="grep -i reflections notes.md" />
              </div>
              <div className={`text-xs uppercase tracking-[0.24em] ${mutedText}`}>
                thinking
              </div>
              <h2 className="mt-3 mb-6 text-3xl font-semibold">Ideas</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {writings.map((writing, index) => (
                  <Reveal key={writing.title} delay={240 + index * 70}>
                    <div className={`rounded-[1.25rem] border p-6 ${cardSurface}`}>
                      <h3 className="font-semibold">{writing.title}</h3>
                      <p className={`mt-3 text-sm leading-7 ${softText}`}>
                        {writing.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </TerminalCard>
        </Reveal>

        <Reveal delay={280} className="mt-20">
          <TerminalCard theme={theme}>
            <WindowHeader theme={theme} title="juanda@portfolio:~/repos" />
            <section id="proyectos" className="p-8 md:p-10">
              <div className="mb-3">
                <ShellPrompt theme={theme} path="~/repos" command="ls -lt github" />
              </div>
              <h2 className="mb-2 text-3xl font-semibold">Experimentos Vibe Coding</h2>
              <p className={`mb-6 text-sm ${mutedText}`}>
                Actividad reciente en GitHub, con carga automatica de los proyectos
                publicos mas recientes.
              </p>
              <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
                {githubProjects.map((repo, index) => (
                  <Reveal key={repo.id || repo.name} delay={300 + index * 60} className="h-full">
                    <RepoCard repo={repo} theme={theme} />
                  </Reveal>
                ))}
              </div>
            </section>
          </TerminalCard>
        </Reveal>

        <Reveal delay={340}>
          <footer
            className={`mt-20 flex items-center justify-between rounded-[1.5rem] border px-6 py-5 text-sm ${sectionSurface}`}
          >
            <div className={mutedText}>© Juanda</div>
            <div className="flex items-center gap-4">
              <a href="/cv" className="underline underline-offset-4">
                cv
              </a>
              <a href="https://github.com/juanda" className="hover:opacity-80">
                <Github size={18} />
              </a>
              <a href="https://juandarodriguez.es" className="hover:opacity-80">
                <Globe size={18} />
              </a>
            </div>
          </footer>
        </Reveal>
      </div>
    </div>
  );
}
