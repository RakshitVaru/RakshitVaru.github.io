import { motion } from "framer-motion";

const roles = [
  {
    period: "Apr 2026 – Present",
    current: true,
    org: "Royal Bank of Canada",
    title: "Lead Data Engineer",
    bullets: [
      <>Consolidating <b>ETL, OTIS, and CORE</b> into a single unified pipeline on Spark, DBT, OpenShift, and PostgreSQL, cutting end-to-end processing from <b>2–3 hours to under 30 minutes</b> (4 hours to under 1 hour for the most data-intensive sources).</>,
      <>Designed a <b>multi-agent validation workflow</b> covering <b>50+ source systems</b> and <b>500+ interconnected DBT models</b>, automatically surfacing schema and logic gaps before production promotion.</>,
      <>Built a custom <b>MCP server</b> exposing scoped tools to the agents, with a <b>RAG knowledge base</b> grounding each check in project documentation rather than model inference.</>,
      <>Own architecture decisions for the unified pipeline and guide engineers on delivery and production readiness.</>,
    ],
  },
  {
    period: "Jul 2023 – Mar 2026",
    current: false,
    org: "Royal Bank of Canada",
    title: "Senior Quality Engineer",
    bullets: [
      <>Led end-to-end testing for migration programs and built reusable <b>automated pipelines</b> for execution and validation.</>,
      <>Delivered <b>Project Emerald (HSBC migration)</b>, moving critical workflows from MySQL to Oracle while preserving data integrity.</>,
      <>Built report-generation and integration workflows that reached <b>100% accuracy</b> across 30+ source systems.</>,
      <>Mentored 5+ engineers and ran 20+ knowledge-sharing sessions.</>,
    ],
  },
  {
    period: "Jul 2021 – Jul 2023",
    current: false,
    org: "Royal Bank of Canada",
    title: "Quality Engineer",
    bullets: [
      <>Built a reusable <b>Python regression suite</b> (Pandas / NumPy) that improved data accuracy by 98% and cut manual QA effort by 40%.</>,
      <>Delivered <b>CDP Migration</b>, validating 25+ source systems and reducing integration errors by 95%.</>,
      <>Ran OTIS and CORE component testing across multiple web services.</>,
    ],
  },
];

const FADE_UP = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-faint)', transition: 'background 0.3s ease' }}
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Section header */}
        <motion.div {...FADE_UP} className="mb-16">
          <span
            className="text-xs tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text3)' }}
          >
            Experience
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}
          >
            A decade-in-five at one bank.
          </h2>
          <p style={{ color: 'var(--text2)' }} className="text-lg max-w-[52ch]">
            Three roles, one throughline: making large-scale data trustworthy.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {roles.map((role, i) => (
            <motion.article
              key={role.title}
              {...FADE_UP}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 py-10"
              style={{ borderTop: '1px solid var(--border-faint)' }}
            >
              {/* Left: meta */}
              <div className="flex flex-col gap-1 pt-0.5">
                <span
                  className="text-xs leading-relaxed"
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    color: role.current ? 'var(--accent)' : 'var(--text3)',
                  }}
                >
                  {role.period}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'var(--text2)' }}
                >
                  {role.org}
                </span>
              </div>

              {/* Right: content */}
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: 'var(--text)',
                  }}
                >
                  {role.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {role.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed"
                      style={{ color: 'var(--text2)' }}
                    >
                      <span
                        className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                        style={{ background: 'var(--accent)', opacity: 0.6 }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
