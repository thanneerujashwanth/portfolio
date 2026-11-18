import { useEffect, useRef, useState } from 'react'
import { Layers, Zap, Globe, Database, ArrowUpRight, CheckCircle2 } from 'lucide-react'

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

const highlights = [
  { icon: <Layers size={18} className="text-burg-300" />, text: 'Interactive analytics dashboard powered by Recharts for granular daily, monthly, and yearly expense tracking.' },
  { icon: <Zap size={18} className="text-burg-300" />, text: 'Real-time bill splitting utilizing native WebSockets for zero-latency synchronization of shared expenses and settlements.' },
  { icon: <Globe size={18} className="text-burg-300" />, text: 'High-throughput RESTful APIs designed for full CRUD operations, paired with a responsive interface built on React Router DOM & Vite.' },
  { icon: <Database size={18} className="text-burg-300" />, text: 'Optimized SQLite transactional database backend with persistent balance audits and multi-participant ledger integrity.' },
]

const tech = ['React', 'Node.js', 'Express', 'SQLite', 'Native WebSockets', 'Recharts', 'Vite', 'Lucide React', 'React Router DOM']

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section
      id="projects"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060609 0%, #0A0207 50%, #060609 100%)' }}
    >
      <div className="tech-grid-bg" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="s-divider flex-1" />
          <span className="label text-xs tracking-[0.25em] font-mono" style={{ color: '#C04060' }}>
            // 04 · FEATURED PRODUCTION SYSTEMS
          </span>
          <div className="s-divider flex-1" />
        </div>

        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Engineered <span className="text-burg-shine italic">Projects</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto font-light text-base">
            Full-stack distributed applications built from architecture to deployment.
          </p>
        </div>

        {/* Featured Project Card */}
        <div
          className={`tech-card rounded-xl overflow-hidden transition-all duration-700 bg-b-700/90 border border-burg-700/50 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Top animated gradient strip */}
          <div
            style={{
              height: 3,
              background: 'linear-gradient(90deg, #4A0E20, #C04060, #FFFFFF, #C04060, #4A0E20)',
              backgroundSize: '200% auto',
              animation: 'borderFlow 4s linear infinite',
              boxShadow: '0 0 20px rgba(192,64,96,0.6)',
            }}
          />

          <div className="p-8 sm:p-12">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded font-mono text-xs tracking-widest uppercase font-semibold text-white"
                style={{
                  background: 'rgba(107,26,42,0.6)',
                  border: '1px solid rgba(192,64,96,0.5)',
                  boxShadow: '0 0 15px rgba(139,32,64,0.3)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-burg-300 animate-pulse" />
                Featured Full-Stack Project
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                LIVE APPLICATION ARCHITECTURE
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
              SplitLedger
            </h3>
            <p className="text-burg-200 text-base sm:text-lg italic font-medium mb-6">
              Real-Time Personal &amp; Group Expense Tracker
            </p>

            <p className="text-white/85 font-normal text-base leading-relaxed mb-8 max-w-3xl">
              A high-concurrency expense management application built with a responsive React frontend, an asynchronous Node.js &amp; Express backend, and native WebSockets for instantaneous multi-peer ledger synchronization.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded bg-white/5 border border-white/10 hover:border-burg-400/50 transition-all"
                >
                  <div className="mt-0.5 shrink-0">{h.icon}</div>
                  <span className="text-sm text-white/90 leading-relaxed font-light">{h.text}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {tech.map(t => (
                <span
                  key={t}
                  className="skill-pill rounded border border-burg-600/40 text-white font-mono text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* More coming soon banner */}
        <div
          className="mt-10 p-6 text-center rounded-lg border border-dashed border-burg-500/30 bg-burg-950/20"
        >
          <p className="font-mono text-xs tracking-[0.25em] text-white/60 uppercase">
            ✦ More Open Source Systems In Active Development ✦
          </p>
        </div>
      </div>
    </section>
  )
}
