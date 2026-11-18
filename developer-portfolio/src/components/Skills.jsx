import { useEffect, useRef, useState } from 'react'
import { Terminal, Cpu, Database, Layout, Users, Sparkles } from 'lucide-react'

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

const skillGroups = [
  {
    category: 'Core Programming',
    icon: <Terminal size={18} className="text-burg-300" />,
    skills: ['C', 'Python', 'Java', 'JavaScript', 'TypeScript (Foundations)'],
  },
  {
    category: 'Frontend Engineering',
    icon: <Layout size={18} className="text-burg-300" />,
    skills: ['HTML5', 'CSS3', 'React', 'Vite', 'React Router DOM', 'Recharts', 'Lucide React', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Distributed',
    icon: <Cpu size={18} className="text-burg-300" />,
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Native WebSockets', 'CRUD Architecture'],
  },
  {
    category: 'Databases & Storage',
    icon: <Database size={18} className="text-burg-300" />,
    skills: ['MongoDB', 'SQL', 'SQLite', 'Data Modeling', 'Query Optimization'],
  },
  {
    category: 'Engineering Leadership',
    icon: <Users size={18} className="text-burg-300" />,
    skills: ['Team Management', 'Project Coordination', 'Mentorship', 'Agile Collaboration', 'Event Planning'],
  },
]

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section
      id="skills"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060609 0%, #0A0207 50%, #060609 100%)' }}
    >
      <div className="tech-grid-bg" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="s-divider flex-1" />
          <span className="label text-xs tracking-[0.25em] font-mono" style={{ color: '#C04060' }}>
            // 02 · TECHNICAL STACK & CAPABILITIES
          </span>
          <div className="s-divider flex-1" />
        </div>

        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Technical <span className="text-burg-shine italic">Arsenal</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto font-light text-base">
            Modern, scalable development tools and architectural disciplines engineered for high reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className={`tech-card rounded-lg p-7 transition-all duration-700 bg-b-700/80 border border-burg-800/40`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${gi * 80}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #1C000B, #380017)',
                    border: '1px solid rgba(192,64,96,0.5)',
                    boxShadow: '0 0 15px rgba(139,32,64,0.3)',
                  }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-white">
                    {group.category}
                  </h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-burg-400 to-transparent mt-1" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map(s => (
                  <span
                    key={s}
                    className="skill-pill rounded border border-white/10 hover:border-burg-300 text-white/90 hover:text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
