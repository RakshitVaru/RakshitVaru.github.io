import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, FileText, Check, Copy, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function GithubIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 22, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const EMAIL = 'rakshitvaru97@gmail.com';

type LucideIcon = React.ComponentType<{ size?: number; style?: React.CSSProperties; strokeWidth?: number }>;

interface ContactItem {
  id: string;
  label: string;
  display: string;
  color: string;
  Icon: LucideIcon;
  href?: string;
  isEmail?: boolean;
}

function ContactCard({
  item,
  delay,
  copied,
  onEmailClick,
}: {
  item: ContactItem;
  delay: number;
  copied: boolean;
  onEmailClick: () => void;
}) {
  const isCopied = !!item.isEmail && copied;

  const inner = (
    <>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: hexToRgba(item.color, 0.12),
          border: `1px solid ${hexToRgba(item.color, 0.22)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isCopied ? 'check' : 'icon'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'flex' }}
          >
            {isCopied
              ? <Check size={22} style={{ color: item.color }} />
              : <item.Icon size={22} style={{ color: item.color }} strokeWidth={1.8} />
            }
          </motion.span>
        </AnimatePresence>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          marginBottom: 5,
        }}>
          {item.label}
        </div>
        <div style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {isCopied ? 'Copied to clipboard!' : item.display}
        </div>
      </div>

      <div style={{ flexShrink: 0, color: 'var(--text3)' }}>
        {item.isEmail ? <Copy size={14} strokeWidth={1.8} /> : <ExternalLink size={14} strokeWidth={1.8} />}
      </div>
    </>
  );

  const baseStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '20px 22px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
    whileHover: { borderColor: hexToRgba(item.color, 0.45) },
  };

  if (item.isEmail) {
    return (
      <motion.button
        type="button"
        {...motionProps}
        onClick={onEmailClick}
        style={{ ...baseStyle, width: '100%', textAlign: 'left' }}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
      style={baseStyle}
    >
      {inner}
    </motion.a>
  );
}

export default function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);
  const { theme } = useTheme();
  const accent = theme === 'dark' ? '#37d495' : '#059669';

  const handleEmailClick = () => {
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
    const a = document.createElement('a');
    a.href = `mailto:${EMAIL}`;
    a.click();
  };

  const CONTACTS: ContactItem[] = [
    {
      id: 'email',
      label: 'Email',
      display: EMAIL,
      color: '#EA4335',
      Icon: Mail,
      isEmail: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      display: '/in/rakshitvaru',
      color: '#0A66C2',
      Icon: LinkedinIcon,
      href: 'https://www.linkedin.com/in/rakshitvaru/',
    },
    {
      id: 'github',
      label: 'GitHub',
      display: 'RakshitVaru',
      color: accent,
      Icon: GithubIcon,
      href: 'https://github.com/RakshitVaru',
    },
    {
      id: 'resume',
      label: 'Résumé',
      display: 'View / Download',
      color: accent,
      Icon: FileText,
      href: '/Rakshit_Varu_Resume.pdf',
    },
  ];

  return (
    <section
      id="contact"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border-faint)',
        transition: 'background 0.3s ease',
      }}
      className="py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="text-xs tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text3)' }}
          >
            Contact
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}
          >
            Let's connect.
          </h2>
          <p className="text-lg max-w-[52ch]" style={{ color: 'var(--text2)' }}>
            Open to interesting roles, collaborations, and conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONTACTS.map((c, i) => (
            <ContactCard
              key={c.id}
              item={c}
              delay={0.05 + i * 0.07}
              copied={emailCopied}
              onEmailClick={handleEmailClick}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 pt-8 text-center"
          style={{ borderTop: '1px solid var(--border-faint)' }}
        >
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text3)' }}>
            © 2026 Rakshit Varu · Built with React + Vite
          </p>
        </motion.div>

      </div>
    </section>
  );
}
