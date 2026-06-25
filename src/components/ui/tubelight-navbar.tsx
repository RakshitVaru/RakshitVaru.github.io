import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  endSlot?: React.ReactNode
}

export function NavBar({ items, className, endSlot }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = items.map(item => ({
      name: item.name,
      el: document.querySelector(item.url) as HTMLElement | null,
    }))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = sections.find(s => s.el === entry.target)
            if (section) setActiveTab(section.name)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach(s => { if (s.el) observer.observe(s.el) })
    return () => observer.disconnect()
  }, [items])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-5",
        className,
      )}
    >
      <div
        className="flex items-center gap-1 py-1 px-1 rounded-full shadow-lg backdrop-blur-xl"
        style={{
          background: 'var(--navbar-bg)',
          border: '1px solid var(--navbar-border)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {items.map(item => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 select-none",
              )}
              style={{
                color: isActive ? 'var(--accent)' : 'var(--text2)',
                fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  style={{ background: 'rgba(var(--accent-rgb, 55 212 149) / .07)' }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Tubelight glow above active item */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                    style={{ background: 'var(--accent)' }}
                  >
                    <div
                      className="absolute rounded-full blur-md -top-2 -left-2"
                      style={{ width: 48, height: 24, background: 'color-mix(in srgb, var(--accent) 22%, transparent)' }}
                    />
                    <div
                      className="absolute rounded-full blur-md -top-1"
                      style={{ width: 32, height: 24, background: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}
                    />
                    <div
                      className="absolute rounded-full blur-sm top-0 left-2"
                      style={{ width: 16, height: 16, background: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}
                    />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}

        {endSlot && (
          <div className="ml-1 mr-0.5">
            {endSlot}
          </div>
        )}
      </div>
    </div>
  )
}
