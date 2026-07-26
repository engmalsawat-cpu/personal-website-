import { useState } from 'react';

const services = [
  {
    number: "01",
    title: "Workflow design",
    body: "Turn scattered processes into a clear way of working that people can actually follow.",
    tag: "Clarity",
  },
  {
    number: "02",
    title: "Tools that fit the work",
    body: "Set up Asana, Notion, or ClickUp around your team—not the other way around.",
    tag: "Structure",
  },
  {
    number: "03",
    title: "Simple AI & automation",
    body: "Remove repetitive steps with practical automations that stay understandable and useful.",
    tag: "Momentum",
  },
];

const steps = [
  ["01", "See the real work", "I map how work moves today, including the handoffs, bottlenecks, and workarounds."],
  ["02", "Create the clear path", "Together we simplify the process and give every tool a clear purpose."],
  ["03", "Make it easier to run", "We automate the repeatable parts and leave your team with a system they can own."],
];

const testimonials = [
  {
    quote: "Abu Saleh is one of the best people we've worked with. He makes everything more connected through his tools and automations.",
    author: "Amro Alharbi",
    role: "Co-founder, Seamlabs Ventures Studio",
  },
  {
    quote: "Abu Saleh is one of the best people you'll ever work with.",
    author: "Almohaned Al-Marwai",
    role: "Founder & CEO, Pure Coffee",
  },
];

const WHATSAPP_URL = "https://wa.me/966507850644";

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');

  const closeMenu = () => setMenuOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <>
      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen} onClick={closeMenu}>
        <div className="mobile-menu__panel" onClick={e => e.stopPropagation()}>
          <button className="mobile-menu__close" onClick={closeMenu} aria-label="Close menu">✕</button>
          <nav className="mobile-menu__nav">
            <a href="#services" onClick={closeMenu}>Work systems</a>
            <a href="#approach" onClick={closeMenu}>AI &amp; automation</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu} className="mobile-menu__cta">Get in touch ↗</a>
          </nav>
          <a
            className="mobile-menu__whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>
        </div>
      </div>

      <main>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Mohammed Alsawat, home">
            <span className="brand-mark">MA</span>
            <span className="brand-copy">
              <strong>Mohammed Alsawat</strong>
              <small>Work Systems &amp; AI</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#services">Work systems</a>
            <a href="#approach">AI &amp; automation</a>
            <a href="#about">About</a>
          </nav>
          <div className="header-right">
            <a className="header-cta" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            <button
              className="hamburger"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>
              <span className="hero-line-primary">There&apos;s a</span><br />
              <span className="hero-line-secondary">better <em className="hero-word">way.</em></span>
            </h1>
            <p className="hero-intro">
              I help teams simplify workflows, choose the right tools, and use practical AI automation.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/hero-workflow.png"
              alt="A calm workflow consultant standing before a busy team, with one clear yellow path through the surrounding process chaos"
            />
          </div>
          <span className="route-bridge" aria-hidden="true" />
        </section>

        <section className="services section-shell" id="services">
          <div className="section-heading">
            <p className="section-kicker">How I help</p>
            <h2>Better systems.<br />Less friction.</h2>
            <p>I connect the way people work, the tools they use, and the automations that can give them time back.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
                <span className="service-tag">{service.tag}</span>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials section-shell">
          <p className="section-kicker">What clients say</p>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <article className="testimonial" key={t.author}>
                <span className="testimonial-mark">"</span>
                <p className="testimonial-quote">{t.quote}</p>
                <footer className="testimonial-author">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="approach" id="approach">
          <div className="approach-header section-shell">
            <p className="section-kicker">A practical approach</p>
            <h2>From tangled to clear.</h2>
            <p>No heavy transformation program. Just a thoughtful look at the work, a simpler design, and useful changes your team can keep.</p>
          </div>
          <div className="steps section-shell">
            {steps.map(([number, title, body]) => (
              <article className="step" key={number}>
                <span>{number}</span>
                <div className="step-line" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about">
          <div className="about-note">
            <span>About the work</span>
            <div className="paper-pin" aria-hidden="true" />
          </div>
          <div className="about-copy">
            <h2>I make the complicated<br /><em>easier to work with.</em></h2>
            <div className="about-columns">
              <p>
                I&apos;m Mohammed Alsawat, a workflow systems and AI consultant based in Riyadh.
                I help teams step back from the daily noise and build a way of working that feels clearer, calmer, and easier to improve.
              </p>
              <p>
                My work sits between people, process, and technology—from designing task systems to introducing practical AI and automation without adding more complexity.
              </p>
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-header">
            <p className="section-kicker">Ready when you are</p>
            <h2>Start a conversation.</h2>
            <p className="contact-sub">Whether you have a specific project in mind or just want to see if there&apos;s a fit — reach out.</p>
          </div>
          <div className="contact-grid">
            {/* WhatsApp */}
            <div className="contact-channel">
              <p className="contact-channel-label">Quickest reply</p>
              <a
                className="whatsapp-btn"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
              <p className="contact-channel-note">Tap to open WhatsApp and start a chat directly.</p>
            </div>

            {/* Email form */}
            <div className="contact-channel">
              <p className="contact-channel-label">Send a message</p>
              {formState === 'sent' ? (
                <div className="form-success">
                  <span className="form-success-icon">✓</span>
                  <p>Message received — I&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        disabled={formState === 'sending'}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        disabled={formState === 'sending'}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me what you're working on…"
                      rows={5}
                      required
                      disabled={formState === 'sending'}
                    />
                  </div>
                  {formState === 'error' && (
                    <p className="form-error">Something went wrong — try WhatsApp instead.</p>
                  )}
                  <button
                    type="submit"
                    className="button button-primary submit-btn"
                    disabled={formState === 'sending'}
                  >
                    {formState === 'sending' ? 'Sending…' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="closing section-shell">
          <p className="section-kicker">The work starts here</p>
          <h2 className="closing-headline">Less chaos.<br /><span>Clearer work.</span></h2>
          <a className="button button-primary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
        </section>

        <footer className="site-footer section-shell">
          <div>
            <strong>Mohammed Alsawat</strong>
            <span>Workflow Systems · Task Tools · Simple AI</span>
          </div>
          <p>Riyadh, Saudi Arabia · Available for selected consulting projects</p>
          <div className="footer-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </>
  );
}
