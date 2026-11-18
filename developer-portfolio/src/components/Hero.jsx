import { useEffect, useRef, useState } from 'react'
import { Linkedin, Mail, Phone, ChevronDown, ArrowRight } from 'lucide-react'

/* ── Typewriter hook ── */
function useTypewriter(words, speed = 90, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx % words.length]
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true)
      } else {
        setDeleting(false)
        setWordIdx(i => i + 1)
      }
    }, delay)

    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

/* ── Interactive particle canvas ── */
function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    const COUNT = 80
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      base: { x: 0, y: 0 },
    }))
    particles.forEach(p => { p.base.x = p.x; p.base.y = p.y })

    let t = 0
    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Drift
        p.x += p.vx + Math.sin(t + i) * 0.08
        p.y += p.vy + Math.cos(t + i * 0.7) * 0.08
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 100) {
          const force = (100 - dist) / 100
          p.x += (dx / dist) * force * 2
          p.y += (dy / dist) * force * 2
        }

        // Draw dot
        const alpha = 0.3 + Math.sin(t * 2 + i) * 0.2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        // Mix between white and burgundy
        const isBurg = i % 3 === 0
        ctx.fillStyle = isBurg
          ? `rgba(192,64,96,${alpha})`
          : `rgba(255,255,255,${alpha * 0.5})`
        ctx.fill()
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139,32,64,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 z-0" />
}

/* ── Scan line ── */
function ScanLine() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(192,64,96,0.4), rgba(255,255,255,0.1), rgba(192,64,96,0.4), transparent)',
          boxShadow: '0 0 20px rgba(192,64,96,0.3)',
          animation: 'scan 5s linear infinite',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(
    ['Full-Stack Developer', 'Team Lead', 'Problem Solver', 'CSE @ KL University'],
    80, 2200
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 100% 80% at 50% -10%, rgba(107,26,42,0.25) 0%, #060609 55%)' }}
    >
      {/* Layers */}
      <ParticleCanvas />
      <ScanLine />
      <div className="tech-grid-bg" />

      {/* Animated rings */}
      {[500, 350, 200].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size, height: size,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid rgba(139,32,64,${0.08 + i * 0.04})`,
            animation: `spin ${30 + i * 20}s linear infinite ${i % 2 ? 'reverse' : ''}`,
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Status badge — always animated */}
        <div
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-10"
          style={{
            background: 'rgba(10,0,5,0.7)',
            border: '1px solid rgba(139,32,64,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              width: 8, height: 8,
              borderRadius: '50%',
              background: '#C04060',
              display: 'inline-block',
              boxShadow: '0 0 8px #C04060',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <span className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Available for Opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-display font-black leading-none mb-4"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
        >
          <span className="text-burg-shine">Jashwanth</span>
        </h1>

        {/* Animated divider under name */}
        <div
          className="mx-auto mb-6"
          style={{
            height: 2, width: 160,
            background: 'linear-gradient(90deg, transparent, #8B2040, #C04060, #8B2040, transparent)',
            backgroundSize: '300% auto',
            animation: 'btnShimmer 2s linear infinite',
            boxShadow: '0 0 12px rgba(192,64,96,0.5)',
          }}
        />

        {/* Typewriter subtitle */}
        <div
          className="font-display italic mb-8"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.65)', minHeight: '2.5rem' }}
        >
          {typed}
          <span
            style={{
              borderRight: '2px solid #C04060',
              marginLeft: 3,
              animation: 'blink 0.75s step-end infinite',
            }}
          />
        </div>

        {/* Summary */}
        <p
          className="font-light leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.95rem' }}
        >
          CSE student at KL University crafting scalable full-stack applications
          and leading high-performance engineering teams.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#projects" className="btn-primary">
            View Projects <ArrowRight size={14} />
          </a>
          <a href="#contact" className="btn-ghost">
            Get In Touch
          </a>
        </div>

        {/* Social strip */}
        <div className="flex justify-center items-center gap-6">
          {[
            { icon: <Mail size={17}/>,     href: 'mailto:jashwanththanneeru1217@gmail.com' },
            { icon: <Linkedin size={17}/>, href: 'https://www.linkedin.com/in/jashwanth99' },
            { icon: <Phone size={17}/>,    href: 'tel:+919160421321' },
          ].map(({ icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              style={{ color: 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color='#C04060'; e.currentTarget.style.filter='drop-shadow(0 0 8px rgba(192,64,96,0.7))' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.2)'; e.currentTarget.style.filter='none' }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ color: 'rgba(139,32,64,0.6)', animation: 'float 2.5s ease-in-out infinite' }}
      >
        <ChevronDown size={26}/>
      </a>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #060609, transparent)' }}
      />

      {/* Blinking cursor keyframe */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes btnShimmer { 0%{background-position:0% center} 100%{background-position:300% center} }
        @keyframes scan { 0%{top:-2%} 100%{top:102%} }
        @keyframes spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
      `}</style>
    </section>
  )
}
