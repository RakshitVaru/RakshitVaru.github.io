"use client";

import { motion } from "framer-motion";
import ProfileCard from "@/components/ui/ProfileCard";
import LetterGlitch from "@/components/ui/LetterGlitch";
import { useTheme } from "@/contexts/ThemeContext";

const STAGGER = {
  container: { animate: { transition: { staggerChildren: 0.12 } } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
};

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const glitchColors = isDark
    ? ['#0d2218', '#1a4a30', '#37d495']
    : ['#b8e8d0', '#70c49a', '#059669'];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center"
      style={{ background: 'var(--bg)', transition: 'background 0.3s ease' }}
    >
      {/* LetterGlitch background — sits below the aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: isDark ? 0.07 : 0.04 }}
        aria-hidden="true"
      >
        <LetterGlitch
          glitchColors={glitchColors}
          glitchSpeed={60}
          outerVignette={false}
          smooth={true}
        />
      </div>

      {/* Aurora glow */}
      <div
        className="aurora-layer pointer-events-none absolute inset-[-10px] opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">

        {/* ── Left: text ──────────────────────────────── */}
        <motion.div
          variants={STAGGER.container}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-7"
        >
          {/* Eyebrow */}
          <motion.span
            variants={STAGGER.item}
            className="text-sm tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: 'var(--text2)' }}
          >
            Lead Data Engineer{" "}
            <span style={{ color: 'var(--accent)' }}>{"//"} Royal Bank of Canada</span>
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={STAGGER.item}
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--text)' }}
          >
            Pipelines that scale.
            <br />
            <span style={{ color: 'var(--accent)' }}>Agents</span> that keep
            <br />
            them honest.
          </motion.h1>

          {/* Lede */}
          <motion.p
            variants={STAGGER.item}
            className="text-lg leading-relaxed max-w-[48ch]"
            style={{ color: 'var(--text2)' }}
          >
            Started as a Quality Engineer - the one who finds what breaks. Five
            years on, I lead the data platforms I once tested. Same instinct for
            correctness, far more leverage.
          </motion.p>

          {/* Personal tags */}
          <motion.div variants={STAGGER.item} className="flex flex-wrap gap-2">
            {["Gaming", "Gym", "Trails"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  color: 'var(--text3)',
                  borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                  background: 'color-mix(in srgb, var(--accent) 4%, transparent)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={STAGGER.item}
            className="flex flex-wrap gap-6 text-sm"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            {[
              ["50+", "source systems"],
              ["500+", "DBT models validated"],
              ["75%", "faster processing"],
            ].map(([n, l]) => (
              <div key={n} className="flex flex-col gap-0.5">
                <span className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>{n}</span>
                <span className="text-xs" style={{ color: 'var(--text2)' }}>{l}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={STAGGER.item} className="flex gap-4 flex-wrap">
            <a
              href="#work"
              className="px-7 py-3 rounded-full font-semibold text-sm transition-all"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.filter = '' }}
            >
              View work
            </a>
            <a
              href="/Rakshit_Varu_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full font-semibold text-sm transition-all border"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'color-mix(in srgb, var(--accent) 10%, transparent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              Résumé
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Profile Card ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <ProfileCard
            avatarUrl=""
            miniAvatarUrl="/avatar.jpg"
            name="Rakshit Varu"
            title="Lead Data Engineer"
            handle="rakshitvaru"
            status="Open to connect"
            contactText="Say Hi"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            behindGlowColor="rgba(55, 212, 149, 0.45)"
            innerGradient="linear-gradient(145deg, rgba(55,212,149,0.1) 0%, rgba(10,13,15,0.98) 100%)"
            onContactClick={() => { window.open('https://www.linkedin.com/in/rakshitvaru/', '_blank', 'noopener,noreferrer'); }}
          />
        </motion.div>

      </div>
    </section>
  );
}
