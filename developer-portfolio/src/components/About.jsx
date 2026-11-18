import { useEffect, useRef, useState } from 'react'
import { GraduationCap, MapPin, Star, Award, Code2, Users } from 'lucide-react'

function useInView(threshold = 0.15) {
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

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section
      id="about"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#060609' }}
    >
      <div className="tech-grid-bg" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="s-divider flex-1" />
          <span className="label text-xs tracking-[0.25em] font-mono" style={{ color: '#C04060' }}>
            // 01 · ARCHITECTURE & BACKGROUND
          </span>
          <div className="s-divider flex-1" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Monogram / Visual Tech Core */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div className="relative mx-auto" style={{ width: 330, height: 400 }}>
              {/* Animated outer frame */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  transform: 'translate(14px, 14px)',
                  border: '1px solid rgba(192,64,96,0.35)',
                  background: 'rgba(26,0,10,0.5)',
                  boxShadow: '0 0 40px rgba(139,32,64,0.25)',
                }}
              />

              {/* Core card */}
              <div
                className="tech-card absolute inset-0 rounded-lg flex flex-col items-center justify-center p-8 text-center"
                style={{
                  background: 'linear-gradient(145deg, #120308 0%, #060609 60%, #15050C 100%)',
                }}
              >
                <div className="corner-bracket corner-tl" />
                <div className="corner-bracket corner-tr" />
                <div className="corner-bracket corner-bl" />
                <div className="corner-bracket corner-br" />

                {/* Rotating orbital indicator */}
                <div
                  className="w-48 h-48 rounded-full border border-burg-600/30 flex items-center justify-center mb-4 relative"
                  style={{ animation: 'spin 25s linear infinite' }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-burg-300"
                    style={{ boxShadow: '0 0 12px #C04060' }}
                  />
                  <div
                    className="w-36 h-36 rounded-full border border-dashed border-white/20 flex items-center justify-center"
                    style={{ animation: 'spin 15s linear infinite reverse' }}
                  />
                </div>

                {/* Monogram overlaid */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div
                    className="font-display font-black text-burg-shine"
                    style={{ fontSize: '8rem', lineHeight: 1 }}
                  >
                    J
                  </div>
                  <div className="font-mono text-xs tracking-[0.35em] text-white/90 uppercase font-semibold mt-2">
                    T. JASHWANTH
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-burg-300 uppercase mt-1">
                    SYS · LEAD · FULL-STACK
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded text-[11px] font-mono tracking-widest uppercase bg-burg-900/60 border border-burg-500/40 text-burg-200">
              ENGINEERING & LEADERSHIP
            </div>

            <h2 className="font-display font-bold leading-tight mb-6 text-3xl sm:text-4xl lg:text-5xl text-white">
              Engineering with <span className="text-burg-shine italic">Precision</span> & Scale
            </h2>

            <p className="text-white/80 font-normal leading-relaxed mb-5 text-base sm:text-lg">
              I am a <strong className="text-white font-semibold">Computer Science Engineering student</strong> at{' '}
              <span className="text-burg-200 font-medium">KL University (Honors through Innovation)</span> with strong foundations in
              full-stack systems, distributed services, and responsive modern interfaces.
            </p>

            <p className="text-white/70 font-light leading-relaxed mb-8 text-sm sm:text-base">
              With hands-on experience developing real-world applications from real-time WebSocket bill splitting to high-throughput REST APIs,
              I bridge technical depth with cross-functional leadership, mentoring developers and executing mission-critical projects.
            </p>

            {/* Live Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '8.73', label: 'CGPA / 10', icon: <Award size={14} className="text-burg-300" /> },
                { value: 'Team Lead', label: 'KL Univ', icon: <Users size={14} className="text-burg-300" /> },
                { value: 'Full-Stack', label: 'Web & APIs', icon: <Code2 size={14} className="text-burg-300" /> },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="tech-card rounded p-4 text-center border border-burg-800/60 bg-b-700/80 hover:border-burg-400/50 transition-all"
                >
                  <div className="flex justify-center mb-1">{stat.icon}</div>
                  <div className="font-display font-bold text-xl sm:text-2xl text-white">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-wider uppercase text-white/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Meta */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <MapPin size={14} className="text-burg-300" />
                Hyderabad, India
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <GraduationCap size={14} className="text-burg-300" />
                B.Tech CSE (Honors) · KL University
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                <Star size={14} className="text-burg-300" />
                Aug 2023 – Present
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
