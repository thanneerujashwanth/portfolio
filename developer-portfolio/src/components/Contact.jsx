import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Phone, Send, MapPin, CheckCircle, Copy } from 'lucide-react'

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

const contacts = [
  { icon: <Mail size={18} className="text-burg-300" />, label: 'Email', value: 'jashwanththanneeru1217@gmail.com', href: 'mailto:jashwanththanneeru1217@gmail.com' },
  { icon: <Linkedin size={18} className="text-burg-300" />, label: 'LinkedIn', value: 'linkedin.com/in/jashwanth99', href: 'https://www.linkedin.com/in/jashwanth99' },
  { icon: <Phone size={18} className="text-burg-300" />, label: 'Phone', value: '+91 9160421321', href: 'tel:+919160421321' },
  { icon: <MapPin size={18} className="text-burg-300" />, label: 'Location', value: 'Hyderabad, India', href: null },
]

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:jashwanththanneeru1217@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('jashwanththanneeru1217@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden" style={{ background: '#060609' }}>
      <div className="tech-grid-bg" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="s-divider flex-1" />
          <span className="label text-xs tracking-[0.25em] font-mono" style={{ color: '#C04060' }}>
            // 05 · COMMUNICATION & COLLABORATION
          </span>
          <div className="s-divider flex-1" />
        </div>

        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Initialize <span className="text-burg-shine italic">Connection</span>
          </h2>
          <p className="text-white/70 max-w-md mx-auto font-light text-base">
            Open to engineering positions, impactful collaborations, and software consulting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Direct channels */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h3 className="font-display font-bold text-2xl text-white mb-6">
              Contact Coordinates
            </h3>

            <div className="space-y-4 mb-8">
              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-lg bg-b-700/80 border border-white/10 hover:border-burg-400/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-burg-950 border border-burg-600/40">
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-widest uppercase text-burg-200">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="text-sm sm:text-base text-white hover:text-burg-200 transition-colors font-medium"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-sm sm:text-base text-white font-medium">{c.value}</span>
                      )}
                    </div>
                  </div>

                  {c.label === 'Email' && (
                    <button
                      onClick={copyEmail}
                      className="text-xs font-mono px-3 py-1.5 rounded bg-white/5 hover:bg-white/15 text-white/80 transition-all"
                      title="Copy Email"
                    >
                      {copied ? 'Copied!' : <Copy size={14} />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Quote block */}
            <div
              className="p-6 rounded-lg bg-burg-950/30 border-l-4 border-burg-400"
            >
              <p className="font-display italic text-lg text-white/90 leading-relaxed">
                "The best way to predict the future is to invent it."
              </p>
              <div className="font-mono text-xs text-burg-300 mt-2">— Alan Kay</div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`tech-card rounded-xl p-8 sm:p-10 bg-b-700/80 border border-burg-700/50 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h3 className="font-display font-bold text-2xl text-white mb-6">
              Direct Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-white/80 mb-2 font-medium">
                  Sender Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name / Organization"
                  className="w-full px-4 py-3 rounded text-sm text-white placeholder-white/30 bg-black/60 border border-white/15 focus:border-burg-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-white/80 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded text-sm text-white placeholder-white/30 bg-black/60 border border-white/15 focus:border-burg-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-white/80 mb-2 font-medium">
                  Message Content
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Detail your inquiry, project scope, or opportunity..."
                  className="w-full px-4 py-3 rounded text-sm text-white placeholder-white/30 bg-black/60 border border-white/15 focus:border-burg-400 outline-none resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full rounded flex items-center justify-center gap-3 py-3.5"
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} className="text-white" />
                    Mail Client Launched!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Dispatch Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
