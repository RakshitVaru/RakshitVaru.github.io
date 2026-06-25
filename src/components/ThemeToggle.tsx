import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidButton } from './ui/liquid-glass-button'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <LiquidButton
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{ color: isDark ? '#e9edeb' : '#0a2218' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate:  90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ display: 'flex' }}
          >
            <Sun size={17} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ display: 'flex' }}
          >
            <Moon size={17} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </LiquidButton>
  )
}
