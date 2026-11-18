import { useEffect, useRef, useState } from 'react'
import { Briefcase, Calendar, ChevronRight, Award, GraduationCap } from 'lucide-react'

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

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden" style={{ background: '#060609' }}>
      <div className="tech-grid-bg" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="s-divider flex-1" />
          <span className="label text-xs tracking-[0.25em] font-mono" style={{ color: '#C04060' }}>
            // 03 · PROFESSIONAL EXPERIENCE & EDUCATION
          </span>
          <div className="s-divider flex-1" />
        </div>

        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Professional <span className="text-burg-shine italic">Milestones</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto font-light text-base">
            Track record of driving impact, mentoring teams, and building software solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase size={16} className="text-burg-300" />
            <span className="font-mono text-xs tracking-widest uppercase text-white/70 font-semibold">
              Work Experience
            </span>
          </div>

          <div
            className={`relative pl-8 sm:pl-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Timeline line */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: 2,
                background: 'linear-gradient(to bottom, rgba(192,64,96,0.8), rgba(107,26,42,0.3))',
              }}
            />
            {/* Pulsing Dot */}
            <div className="timeline-dot absolute left-0 top-7 -translate-x-1/2" />

            <div className="tech-card rounded-lg p-6 sm:p-8 bg-b-700/80 border border-burg-800/60 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1">
                    Full Stack Developer (Team Lead)
                  </h3>
                  <div className="text-burg-200 font-semibold text-base">
                    KL University
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-white/5 px-3 py-1 rounded border border-white/10">
                    <Calendar size={13} className="text-burg-300" />
                    JAN 2024 – Present
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-mono tracking-wider text-burg-200 bg-burg-900/60 border border-burg-500/40 rounded">
                    LEADERSHIP ROLE
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  'Led a cross-functional team in developing scalable full-stack applications, ensuring high performance, security, and maintainability using modern technologies.',
                  'Led and managed a team of students for various projects and events, delegating tasks and ensuring all milestones were achieved ahead of schedule.',
                  'Coordinated tasks, delegated responsibilities, and facilitated active communication to guarantee seamless team collaboration.',
                  'Conducted technical mentorship, architectural code reviews, and structured knowledge transfer workshops.',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/85 text-sm sm:text-base leading-relaxed">
                    <ChevronRight size={16} className="mt-1 shrink-0 text-burg-300" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={16} className="text-burg-300" />
            <span className="font-mono text-xs tracking-widest uppercase text-white/70 font-semibold">
              Academic Background
            </span>
          </div>

          <div
            className={`tech-card rounded-lg p-6 sm:p-8 bg-b-700/80 border border-burg-800/60 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-1">
                  B.Tech in Computer Science Engineering
                </h3>
                <div className="text-white/70 text-sm italic mb-2">
                  Honors through Innovation
                </div>
                <div className="text-burg-200 font-semibold text-base">
                  KL University
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-white/5 px-3 py-1 rounded border border-white/10">
                  <Calendar size={13} className="text-burg-300" />
                  Aug 2023 – Present
                </div>
                <div
                  className="px-4 py-2 font-display font-bold text-sm sm:text-base rounded"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,32,64,0.4), rgba(45,0,18,0.7))',
                    border: '1px solid rgba(192,64,96,0.5)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 20px rgba(139,32,64,0.3)',
                  }}
                >
                  CGPA: 8.73 / 10.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
