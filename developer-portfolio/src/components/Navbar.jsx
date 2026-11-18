import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = navItems.map(n => n.href.slice(1)).reverse()
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(6,6,9,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(192,64,96,0.3)' : 'none',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.8)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-bold tracking-wider flex items-center gap-2">
          <span className="w-8 h-8 rounded bg-gradient-to-br from-burg-600 to-burg-400 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-burg-600/30">
            J
          </span>
          <span className="text-white tracking-widest font-semibold">JASHWANTH</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${active === item.href.slice(1) ? 'active text-white' : 'text-white/70'}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase text-white bg-burg-600 hover:bg-burg-500 border border-burg-400 rounded transition-all shadow-md shadow-burg-900/50"
          >
            Connect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white hover:text-burg-300 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5 bg-b-800/98 border-b border-burg-800/80"
        >
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-white text-sm font-mono tracking-widest uppercase py-1"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
