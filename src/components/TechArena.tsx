import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

interface Tool { name: string; slug: string | null; color: string; }

interface Stage { id: string; label: string; tools: Tool[]; }

const STAGES: Stage[] = [
  {
    id: 'ingest', label: 'Ingest',
    tools: [
      { name: 'Airflow',     slug: 'apacheairflow', color: '#017CEE' },
      { name: 'Spark',       slug: 'apachespark',   color: '#E25A1C' },
      { name: 'Stonebranch', slug: null,            color: '#0078BF' },
    ],
  },
  {
    id: 'transform', label: 'Transform',
    tools: [
      { name: 'Python',  slug: 'python',  color: '#3776AB' },
      { name: 'dbt',     slug: 'dbt',     color: '#FF694B' },
      { name: 'Pandas',  slug: 'pandas',  color: '#150458' },
      { name: 'NumPy',   slug: 'numpy',   color: '#013243' },
      { name: 'Iceberg', slug: null,      color: '#00B4D8' },
    ],
  },
  {
    id: 'store', label: 'Store',
    tools: [
      { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
      { name: 'Snowflake',  slug: 'snowflake',  color: '#29B5E8' },
      { name: 'MySQL',      slug: 'mysql',      color: '#4479A1' },
      { name: 'Oracle',     slug: 'oracle',     color: '#F80000' },
      { name: 'MongoDB',    slug: 'mongodb',    color: '#47A248' },
      { name: 'DuckDB',     slug: 'duckdb',     color: '#FFCA28' },
    ],
  },
  {
    id: 'serve', label: 'Serve',
    tools: [
      { name: 'FastAPI',    slug: 'fastapi',    color: '#009688' },
      { name: 'Streamlit',  slug: 'streamlit',  color: '#FF4B4B' },
      { name: 'D3.js',      slug: 'd3dotjs',    color: '#F9A03C' },
      { name: 'Tableau',    slug: 'tableau',    color: '#E97627' },
      { name: 'LangChain',  slug: 'langchain',  color: '#37d495' },
      { name: 'MCP',        slug: null,         color: '#9B59B6' },
      { name: 'RAG',        slug: null,         color: '#E67E22' },
    ],
  },
  {
    id: 'platform', label: 'Platform',
    tools: [
      { name: 'AWS',        slug: 'amazonwebservices', color: '#FF9900' },
      { name: 'Docker',     slug: 'docker',            color: '#2496ED' },
      { name: 'Kubernetes', slug: 'kubernetes',        color: '#326CE5' },
      { name: 'Terraform',  slug: 'terraform',         color: '#7B42BC' },
      { name: 'OpenShift',  slug: 'redhatopenshift',   color: '#EE0000' },
      { name: 'Jenkins',    slug: 'jenkins',           color: '#D24939' },
      { name: 'Git',        slug: 'git',               color: '#F05032' },
    ],
  },
];

// CSS keyframes for animated dots — percentages are relative to the positioned parent
const KEYFRAMES = `
  @keyframes dot-right {
    0%   { left: 0px;              opacity: 0; }
    10%  { left: 0px;              opacity: 1; }
    90%  { left: calc(100% - 6px); opacity: 1; }
    100% { left: calc(100% - 6px); opacity: 0; }
  }
  @keyframes dot-left {
    0%   { left: calc(100% - 6px); opacity: 0; }
    10%  { left: calc(100% - 6px); opacity: 1; }
    90%  { left: 0px;              opacity: 1; }
    100% { left: 0px;              opacity: 0; }
  }
  @keyframes dot-down {
    0%   { top: 0px;              opacity: 0; }
    10%  { top: 0px;              opacity: 1; }
    90%  { top: calc(100% - 6px); opacity: 1; }
    100% { top: calc(100% - 6px); opacity: 0; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Logo — tries SimpleIcons CDN, falls back to colored abbreviation
// ─────────────────────────────────────────────────────────────────────────────

function Logo({ slug, name, color }: { slug: string | null; name: string; color: string }) {
  const [failed, setFailed] = useState(false);
  const { theme } = useTheme();

  // Use white icons on dark chips; brand color on light chips
  const iconHex = theme === 'dark' ? 'ffffff' : color.replace('#', '');

  if (!slug || failed) {
    return (
      <span
        style={{
          color,
          fontSize: 8,
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 1,
          letterSpacing: '.04em',
        }}
      >
        {name.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${iconHex}`}
      alt={name}
      width={14}
      height={14}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={() => setFailed(true)}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool chip
// ─────────────────────────────────────────────────────────────────────────────

function Chip({ tool }: { tool: Tool }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-default"
      style={{ background: 'var(--chip-bg)', border: '1px solid var(--chip-border)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'color-mix(in srgb, var(--accent) 6%, var(--chip-bg))';
        (e.currentTarget as HTMLDivElement).style.borderColor = tool.color + '50';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'var(--chip-bg)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--chip-border)';
      }}
    >
      <div className="w-4 h-4 flex items-center justify-center shrink-0">
        <Logo slug={tool.slug} name={tool.name} color={tool.color} />
      </div>
      <span
        className="text-[13px] whitespace-nowrap"
        style={{ color: 'var(--text2)', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
      >
        {tool.name}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage card
// ─────────────────────────────────────────────────────────────────────────────

function StageCard({
  stage,
  index,
  style,
}: {
  stage: Stage;
  index: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '16px 14px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}
        >
          {stage.label}
        </span>
        <span
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--border)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {stage.tools.map(tool => (
          <Chip key={tool.name} tool={tool} />
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Flow connector — right / down / left with animated glow dot
// ─────────────────────────────────────────────────────────────────────────────

function FlowConnector({
  dir,
  delay,
  style,
}: {
  dir: 'right' | 'down' | 'left';
  delay: number;
  style?: React.CSSProperties;
}) {
  const DOT: React.CSSProperties = {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--accent)',
    boxShadow: '0 0 8px var(--accent)',
  };

  const TRAIL: React.CSSProperties = {
    ...DOT,
    width: 4,
    height: 4,
    boxShadow: 'none',
    opacity: 0.3,
  };

  if (dir === 'down') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...style,
        }}
      >
        <div
          style={{
            flex: 1,
            width: 1,
            background: 'var(--border)',
            position: 'relative',
          }}
        >
          <div
            style={{
              ...DOT,
              left: '50%',
              marginLeft: -3,
              animation: `dot-down 3.5s linear ${delay}s infinite`,
            }}
          />
          <div
            style={{
              ...TRAIL,
              left: '50%',
              marginLeft: -2,
              animation: `dot-down 3.5s linear ${delay + 0.45}s infinite`,
            }}
          />
        </div>
        {/* Arrowhead pointing down */}
        <div
          style={{
            flexShrink: 0,
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '6px solid color-mix(in srgb, var(--accent) 45%, transparent)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'start',
        marginTop: 28,
        ...style,
      }}
    >
      {/* Left arrowhead */}
      {dir === 'left' && (
        <div
          style={{
            flexShrink: 0,
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderRight: '6px solid color-mix(in srgb, var(--accent) 45%, transparent)',
          }}
        />
      )}

      {/* Line */}
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'var(--border)',
          position: 'relative',
        }}
      >
        <div
          style={{
            ...DOT,
            top: '50%',
            marginTop: -3,
            animation: `dot-${dir} 3.5s linear ${delay}s infinite`,
          }}
        />
        <div
          style={{
            ...TRAIL,
            top: '50%',
            marginTop: -2,
            animation: `dot-${dir} 3.5s linear ${delay + 0.45}s infinite`,
          }}
        />
      </div>

      {/* Right arrowhead */}
      {dir === 'right' && (
        <div
          style={{
            flexShrink: 0,
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '6px solid color-mix(in srgb, var(--accent) 45%, transparent)',
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TechArena() {
  return (
    <section
      id="stack"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-faint)', transition: 'background 0.3s ease' }}
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span
            className="text-xs tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text3)' }}
          >
            Stack
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}
          >
            The tools that do the work.
          </h2>
          <p style={{ color: 'var(--text2)' }} className="text-lg max-w-[52ch]">
            Every layer of the data stack - from ingestion to production.
          </p>
        </motion.div>

        {/* Outer card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{
            borderRadius: 20,
            border: '1px solid var(--border)',
            background: 'var(--bg-card2)',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <style>{KEYFRAMES}</style>

          {/* ── Mobile: vertical stack ──────────────────────── */}
          <div className="flex flex-col gap-4 p-6 md:hidden">
            {STAGES.map((stage, i) => (
              <StageCard key={stage.id} stage={stage} index={i} />
            ))}
          </div>

          {/* ── Desktop: single left-to-right row ──────────── */}
          {/* INGEST → TRANSFORM → STORE → SERVE → PLATFORM   */}
          <div
            className="hidden md:grid p-8"
            style={{
              gridTemplateColumns: '1fr 52px 1fr 52px 1fr 52px 1fr 52px 1fr',
              columnGap: 0,
            }}
          >
            <StageCard stage={STAGES[0]} index={0} />
            <FlowConnector dir="right" delay={0} />
            <StageCard stage={STAGES[1]} index={1} />
            <FlowConnector dir="right" delay={0.75} />
            <StageCard stage={STAGES[2]} index={2} />
            <FlowConnector dir="right" delay={1.5} />
            <StageCard stage={STAGES[3]} index={3} />
            <FlowConnector dir="right" delay={2.25} />
            <StageCard stage={STAGES[4]} index={4} />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
