import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Database, Bot, BarChart3, FileText } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import type { DisplayCardProps } from "@/components/ui/display-cards";

interface Project {
  id: string;
  tag: string;
  title: string;
  short: string;
  description: string;
  chips: string[];
  link?: string;
  linkLabel?: string;
  icon: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    tag: "Production · RBC",
    title: "Multi-agent DBT validation",
    short: "Agents that catch what humans miss",
    description:
      "A workflow of cooperating agents that validates 500+ interconnected DBT models across 50+ source systems against their source specifications before any pipeline reaches production. Backed by a custom MCP server for scoped tool access and a RAG knowledge base so each check is grounded in real documentation — not model inference. Replaced slow, error-prone manual review entirely.",
    chips: ["Multi-agent", "MCP", "RAG", "DBT", "Python"],
    icon: <Bot size={15} style={{ color: 'var(--accent)' }} />,
  },
  {
    id: "02",
    tag: "Production · RBC",
    title: "ETL-OTIS-CORE consolidation",
    short: "Three legacy pipelines merged into one",
    description:
      "Merging three legacy data flows — ETL, OTIS, and CORE — into a single Spark and DBT pipeline running on OpenShift and PostgreSQL. End-to-end processing cut from 2–3 hours to under 30 minutes across the board (4 hours to under 1 hour for the most data-intensive sources). Owns architecture decisions and guides the team on delivery and production readiness.",
    chips: ["Spark", "DBT", "OpenShift", "PostgreSQL"],
    icon: <Database size={15} style={{ color: 'var(--accent)' }} />,
  },
  {
    id: "03",
    tag: "Open source",
    title: "RetailInsights",
    short: "Full-stack analytics platform",
    description:
      "A full-stack analytics platform: FastAPI backend serving insights, Streamlit visualizations for interactive exploration, Dockerized deployment on AWS EC2, with Snowflake SQL powering real-time sales trend queries. Built as an end-to-end showcase of the modern data stack outside the enterprise context.",
    chips: ["FastAPI", "Snowflake", "Docker", "AWS", "Streamlit"],
    link: "#",
    linkLabel: "GitHub",
    icon: <BarChart3 size={15} style={{ color: 'var(--accent)' }} />,
  },
  {
    id: "04",
    tag: "Published research",
    title: "ARMatrix",
    short: "Market-basket analysis, visualized",
    description:
      "A 2D item-to-rule matrix for interactive association-rule analysis of market-basket data. Lets analysts explore large rule sets visually rather than scanning flat tables — highlighting support, confidence, and lift at a glance. Published in the MDPI Journal of Electronics.",
    chips: ["Pandas", "NumPy", "Association rules", "Research"],
    link: "https://www.mdpi.com/1600930",
    linkLabel: "Read paper",
    icon: <FileText size={15} style={{ color: 'var(--accent)' }} />,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// Stack classNames: cards ordered back → front (last = top)
const STACK_CLASSES = [
  // Card 0 — back (ARMatrix)
  "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(255,255,255,.06)] before:h-[100%] before:content-[''] before:bg-[var(--card-overlay)] grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  // Card 1
  "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-4 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(255,255,255,.06)] before:h-[100%] before:content-[''] before:bg-[var(--card-overlay)] grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  // Card 2
  "[grid-area:stack] translate-x-24 translate-y-16 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(255,255,255,.06)] before:h-[100%] before:content-[''] before:bg-[var(--card-overlay)] grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  // Card 3 — front (Multi-agent)
  "[grid-area:stack] translate-x-36 translate-y-24 hover:translate-y-[84px]",
];

export default function Work() {
  const [selected, setSelected] = useState<number | null>(0);

  // Build cards array: back-to-front order = [ARMatrix, Retail, ETL, Multiagent]
  const stackOrder = [3, 2, 1, 0]; // indices into PROJECTS for back→front
  const cards: DisplayCardProps[] = stackOrder.map((projectIdx, stackIdx) => ({
    icon: PROJECTS[projectIdx].icon,
    title: PROJECTS[projectIdx].title,
    description: PROJECTS[projectIdx].short,
    date: PROJECTS[projectIdx].id + " · " + PROJECTS[projectIdx].tag,
    className: STACK_CLASSES[stackIdx],
    onClick: () => setSelected(projectIdx),
    titleClassName:
      selected === projectIdx ? "text-[#37d495]" : "text-[#37d495]",
  }));

  const project = selected !== null ? PROJECTS[selected] : null;

  return (
    <section
      id="work"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-faint)', transition: 'background 0.3s ease' }}
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-20"
        >
          <span
            className="text-xs tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text3)' }}
          >
            Work
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}
          >
            Things I've shipped.
          </h2>
          <p style={{ color: 'var(--text2)' }} className="text-lg max-w-[52ch]">
            Production systems, open-source tools, and published research — built across five years at RBC and beyond.
          </p>
        </motion.div>

        {/* Cards + detail */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* Stacked DisplayCards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="shrink-0 w-[31rem] pb-24"
          >
            <p
              className="text-xs tracking-widest uppercase mb-8"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text3)' }}
            >
              Click a card to explore
            </p>
            <DisplayCards cards={cards} />
          </motion.div>

          {/* Detail panel */}
          <div className="flex-1 min-h-[320px] flex items-start">
            <AnimatePresence mode="wait">
              {project ? (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-full rounded-2xl p-8"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                          border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                        }}
                      >
                        {project.icon}
                      </span>
                      <div>
                        <span
                          className="text-xs block mb-0.5"
                          style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text3)' }}
                        >
                          {project.id} · {project.tag}
                        </span>
                        <h3
                          className="text-2xl md:text-3xl font-bold leading-tight"
                          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm shrink-0 px-4 py-2 rounded-full transition-all"
                        style={{
                          color: 'var(--accent)',
                          border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                          fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'color-mix(in srgb, var(--accent) 10%, transparent)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                      >
                        {project.linkLabel}
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[15px] leading-relaxed mb-7" style={{ color: 'var(--text2)' }}>
                    {project.description}
                  </p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2">
                    {project.chips.map(chip => (
                      <span
                        key={chip}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                          color: 'var(--text2)',
                          background: 'var(--chip-bg)',
                          border: '1px solid var(--chip-border)',
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex items-center justify-center min-h-[260px]"
                >
                  <p
                    className="text-sm"
                    style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text3)' }}
                  >
                    ← Select a project
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
