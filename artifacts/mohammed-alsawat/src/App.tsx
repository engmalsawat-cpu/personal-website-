import { useState } from 'react';
import { useLang } from './contexts/LanguageContext';

const WHATSAPP_URL = "https://wa.me/966507850644";

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function App() {
  const { lang, isAr, toggle, t } = useLang();
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
            <a href="#services" onClick={closeMenu}>{t('nav.work')}</a>
            <a href="#approach" onClick={closeMenu}>{t('nav.ai')}</a>
            <a href="#about" onClick={closeMenu}>{t('nav.about')}</a>
            <a href="#contact" onClick={closeMenu} className="mobile-menu__cta">{t('nav.cta')} ↗</a>
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
            {t('mobile.whatsapp')}
          </a>
        </div>
      </div>

      <main>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Mohammed Alsawat, home">
            <span className="brand-mark">MA</span>
            <span className="brand-copy">
              <strong>{t('brand.name')}</strong>
              <small>{t('brand.tagline')}</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#services">{t('nav.work')}</a>
            <a href="#approach">{t('nav.ai')}</a>
            <a href="#about">{t('nav.about')}</a>
          </nav>
          <div className="header-right">
            <a className="header-cta" href="#contact">{t('nav.cta')} <span aria-hidden="true">↗</span></a>
            <button
              className="lang-toggle"
              onClick={toggle}
              aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {isAr ? 'EN' : 'AR'}
            </button>
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
              <span className="hero-line-primary">{t('hero.line1')}</span><br />
              <span className="hero-line-secondary">{t('hero.line2')} <em className="hero-word">{t('hero.word')}</em></span>
            </h1>
            <p className="hero-intro">{t('hero.intro')}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">{t('hero.cta')} <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/hero-workflow.png"
              alt={t('hero.img.alt')}
            />
          </div>
          <span className="route-bridge" aria-hidden="true" />
        </section>

        <section className="services section-shell" id="services">
          <div className="section-heading">
            <p className="section-kicker">{t('services.kicker')}</p>
            <h2>
              {t('services.h2').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p>{t('services.body')}</p>
          </div>
          <div className="service-list">
            {(['01', '02', '03'] as const).map((num) => (
              <article className="service-row" key={num}>
                <span className="service-number">{num}</span>
                <div>
                  <h3>{t(`service.${num}.title`)}</h3>
                  <p>{t(`service.${num}.body`)}</p>
                </div>
                <span className="service-tag">{t(`service.${num}.tag`)}</span>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials section-shell">
          <p className="section-kicker">{t('testimonials.kicker')}</p>
          <div className="testimonials-grid">
            {(['1', '2'] as const).map((n) => (
              <article className="testimonial" key={n}>
                <span className="testimonial-mark">"</span>
                <p className="testimonial-quote">{t(`testimonial.${n}.quote`)}</p>
                <footer className="testimonial-author">
                  <strong>{t(`testimonial.${n}.author`)}</strong>
                  <span>{t(`testimonial.${n}.role`)}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="approach" id="approach">
          <div className="approach-header section-shell">
            <p className="section-kicker">{t('approach.kicker')}</p>
            <h2>{t('approach.h2')}</h2>
            <p>{t('approach.body')}</p>
          </div>
          <div className="steps section-shell">
            {(['01', '02', '03'] as const).map((num) => (
              <article className="step" key={num}>
                <span>{num}</span>
                <div className="step-line" />
                <h3>{t(`step.${num}.title`)}</h3>
                <p>{t(`step.${num}.body`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about">
          <div className="about-note">
            <span>{t('about.note')}</span>
            <div className="paper-pin" aria-hidden="true" />
          </div>
          <div className="about-copy">
            <h2>{t('about.h2.line1')}<br /><em>{t('about.h2.em')}</em></h2>
            <div className="about-columns">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-header">
            <p className="section-kicker">{t('contact.kicker')}</p>
            <h2>{t('contact.h2')}</h2>
            <p className="contact-sub">{t('contact.sub')}</p>
          </div>
          <div className="contact-grid">
            {/* WhatsApp */}
            <div className="contact-channel">
              <p className="contact-channel-label">{t('contact.quickest')}</p>
              <a
                className="whatsapp-btn"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('contact.whatsapp')}
              </a>
              <p className="contact-channel-note">{t('contact.whatsapp.note')}</p>
            </div>

            {/* Email form */}
            <div className="contact-channel">
              <p className="contact-channel-label">{t('contact.send')}</p>
              {formState === 'sent' ? (
                <div className="form-success">
                  <span className="form-success-icon">✓</span>
                  <p>{t('contact.success')}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">{t('form.name')}</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('form.name.placeholder')}
                        required
                        disabled={formState === 'sending'}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">{t('form.email')}</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('form.email.placeholder')}
                        required
                        disabled={formState === 'sending'}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">{t('form.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('form.message.placeholder')}
                      rows={5}
                      required
                      disabled={formState === 'sending'}
                    />
                  </div>
                  {formState === 'error' && (
                    <p className="form-error">{t('contact.error')}</p>
                  )}
                  <button
                    type="submit"
                    className="button button-primary submit-btn"
                    disabled={formState === 'sending'}
                  >
                    {formState === 'sending' ? t('form.sending') : t('form.send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="closing section-shell">
          <p className="section-kicker">{t('closing.kicker')}</p>
          <h2 className="closing-headline">{t('closing.h2.line1')}<br /><span>{t('closing.h2.span')}</span></h2>
          <a className="button button-primary" href="#contact">{t('closing.cta')} <span aria-hidden="true">↗</span></a>
        </section>

        <footer className="site-footer section-shell">
          <div>
            <strong>{t('footer.name')}</strong>
            <span>{t('footer.services')}</span>
          </div>
          <p>{t('footer.location')}</p>
          <div className="footer-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t('footer.whatsapp')}</a>
            <a href="#top">{t('footer.top')}</a>
          </div>
        </footer>
      </main>
    </>
  );
}
