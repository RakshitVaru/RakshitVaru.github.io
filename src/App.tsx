import './index.css'
import { Home, Briefcase, FolderOpen, Layers, Award, Send } from 'lucide-react'
import { ThemeProvider } from './contexts/ThemeContext'
import { NavBar } from './components/ui/tubelight-navbar'
import { ThemeToggle } from './components/ThemeToggle'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Work from './components/Work'
import TechArena from './components/TechArena'
import Credentials from './components/Credentials'
import Contact from './components/Contact'

const NAV_ITEMS = [
  { name: 'Home',        url: '#hero',        icon: Home },
  { name: 'Experience',  url: '#experience',  icon: Briefcase },
  { name: 'Work',        url: '#work',        icon: FolderOpen },
  { name: 'Stack',       url: '#stack',       icon: Layers },
  { name: 'Credentials', url: '#credentials', icon: Award },
  { name: 'Contact',     url: '#contact',     icon: Send },
]

export default function App() {
  return (
    <ThemeProvider>
      <main>
        <NavBar items={NAV_ITEMS} endSlot={<ThemeToggle />} />
        <Hero />
        <Experience />
        <Work />
        <TechArena />
        <Credentials />
        <Contact />
      </main>
    </ThemeProvider>
  )
}
