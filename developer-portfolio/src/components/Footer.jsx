import { Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative py-12 px-6 text-center border-t border-burg-900/60 overflow-hidden"
      style={{ background: '#030306' }}
    >
      <div className="s-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Top Logo */}
        <div className="font-display text-2xl font-bold mb-4 tracking-wider text-white">
          <span className="text-burg-shine">T. JASHWANTH</span>
        </div>

        <p className="text-white/60 text-sm max-w-md mb-6 font-light">
          Full-Stack Developer &amp; Team Lead · Building modern high-performance web applications.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: <Mail size={18} />, href: 'mailto:jashwanththanneeru1217@gmail.com', label: 'Email' },
            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/jashwanth99', label: 'LinkedIn' },
          ].map(({ icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-burg-400 hover:bg-burg-900/40 transition-all"
            >
              {icon}
            </a>
          ))}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-burg-400 hover:bg-burg-900/40 transition-all"
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-xs font-mono uppercase tracking-widest text-white/60">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-burg-200 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-white/40">
          © {new Date().getFullYear()} T. Jashwanth. Crafted with high-precision React &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
