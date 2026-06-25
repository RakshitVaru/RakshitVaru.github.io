import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const EDUCATION = [
  { degree: 'M.Sc.', field: 'Computer Science',        institution: 'Dalhousie University',                   location: 'Halifax, Canada' },
  { degree: 'B.Tech.', field: 'Information Technology', institution: 'SRM Institute of Science & Technology', location: 'Chennai, India'  },
];

const CERTS = [
  {
    issuer:  'Amazon Web Services',
    name:    'Certified Developer',
    level:   'Associate',
    code:    'DVA-C02',
    status:  'Active',
    color:   '#FF9900',
    slug:    'amazonaws',
    iconUrl: 'https://api.iconify.design/logos/aws.svg',
    verify:  'https://www.credly.com/badges/5ff17947-6f3c-4081-8ccc-d1689b88973f/linked_in_profile',
  },
  {
    issuer:  'Snowflake',
    name:    'SnowPro Associate',
    level:   'Platform Certification',
    code:    'ADA-C01',
    status:  'Active',
    color:   '#29B5E8',
    slug:    'snowflake',
    iconUrl: undefined,
    verify:  'https://achieve.snowflake.com/fe91ec67-a56b-4d18-9d30-e4685ad53349#acc.DfkxiBYm',
  },
];

// ─── Pulsing dot ──────────────────────────────────────────────────────────────

function ActiveDot({ color }: { color: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: 8, height: 8, flexShrink: 0 }}>
      <motion.span
        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }}
      />
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'block' }} />
    </span>
  );
}

// ─── SimpleIcons logo ─────────────────────────────────────────────────────────

function SiLogo({ slug, color, size = 36, src }: { slug: string; color: string; size?: number; src?: string }) {
  const [failed, setFailed] = useState(false);
  const url = src ?? `https://cdn.simpleicons.org/${slug}/${color.replace('#','')}`;
  useEffect(() => { setFailed(false); }, [url]);
  if (failed) return <span style={{ color, fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}>{slug.slice(0,3).toUpperCase()}</span>;
  return (
    <img
      src={url}
      alt={slug} width={size} height={size}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={() => setFailed(true)}
    />
  );
}

// ─── Logo zone (top panel of each card) ───────────────────────────────────────

function LogoZone({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        height: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        backgroundColor: hexToRgba(color, 0.06),
        backgroundImage: `radial-gradient(circle, ${hexToRgba(color, 0.07)} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        borderBottom: `1px solid ${hexToRgba(color, 0.14)}`,
        overflow: 'hidden',
      }}
    >
      {/* Soft radial glow behind logo */}
      <div style={{
        position: 'absolute',
        width: 88, height: 88,
        borderRadius: '50%',
        background: hexToRgba(color, 0.14),
        filter: 'blur(18px)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Card shell ───────────────────────────────────────────────────────────────

function CredCard({
  accentColor,
  logoZone,
  delay,
  children,
}: {
  accentColor: string;
  logoZone: React.ReactNode;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease, border-color 0.2s ease',
      }}
      whileHover={{ borderColor: hexToRgba(accentColor, 0.35) }}
    >
      {logoZone}
      <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Credentials() {
  const { theme } = useTheme();
  const educationAccent = theme === 'dark' ? '#37d495' : '#059669';

  return (
    <section
      id="credentials"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-faint)', transition: 'background 0.3s ease' }}
      className="py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="text-xs tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text3)' }}>
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}>
            Trained to build.
          </h2>
          <p className="text-lg max-w-[52ch]" style={{ color: 'var(--text2)' }}>
            The academic foundations and certifications behind the work.
          </p>
        </motion.div>

        {/* 2×2 grid — education top row, certs bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ── Education (one card per degree) ───────────────── */}
          {EDUCATION.map((edu, i) => (
            <CredCard
              key={edu.degree}
              accentColor={educationAccent}
              delay={0.1 + i * 0.07}
              logoZone={
                <LogoZone color={educationAccent}>
                  <GraduationCap size={32} strokeWidth={1.5} style={{ color: educationAccent }} />
                </LogoZone>
              }
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em',
                textTransform: 'uppercase', color: educationAccent, display: 'block', marginBottom: 10 }}>
                Education
              </span>
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.2, marginBottom: 3 }}>
                {edu.degree}
              </p>
              <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, color: 'var(--text2)', marginBottom: 2 }}>
                {edu.field}
              </p>
              <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: 'var(--text2)', marginBottom: 2 }}>
                {edu.institution}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-faint)' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text3)' }}>
                  {edu.location}
                </p>
              </div>
            </CredCard>
          ))}

          {/* ── Certifications ────────────────────────────────── */}
          {CERTS.map((cert, i) => (
            <CredCard
              key={cert.name}
              accentColor={cert.color}
              delay={0.15 + i * 0.08}
              logoZone={
                <LogoZone color={cert.color}>
                  <SiLogo slug={cert.slug} color={cert.color} size={32} src={cert.iconUrl} />
                </LogoZone>
              }
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em',
                textTransform: 'uppercase', color: cert.color, display: 'block', marginBottom: 10 }}>
                {cert.issuer}
              </span>

              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 19, fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.2, marginBottom: 3 }}>
                {cert.name}
              </p>
              <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: 'var(--text2)', marginBottom: 12 }}>
                {cert.level}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <ActiveDot color="var(--accent)" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: 'var(--accent)', letterSpacing: '.04em' }}>
                  {cert.status}
                </span>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-faint)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.08em',
                  padding: '3px 9px', borderRadius: 999,
                  background: hexToRgba(cert.color, 0.1),
                  border: `1px solid ${hexToRgba(cert.color, 0.25)}`,
                  color: cert.color,
                }}>
                  {cert.code}
                </span>

                <a
                  href={cert.verify} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-all"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12,
                    color: cert.color,
                    border: `1px solid ${hexToRgba(cert.color, 0.3)}`,
                    padding: '4px 11px', borderRadius: 999,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = hexToRgba(cert.color, 0.1); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                >
                  Verify <ExternalLink size={11} />
                </a>
              </div>
            </CredCard>
          ))}

        </div>
      </div>
    </section>
  );
}
