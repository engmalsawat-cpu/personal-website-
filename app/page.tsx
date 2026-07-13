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

export default function Home() {
  return (
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
          <a href="#services">Tools</a>
          <a href="#approach">AI &amp; automation</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="#services">Improve your workflow <span aria-hidden="true">↗</span></a>
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
            <a className="button button-primary" href="#services">Simplify your workflow <span aria-hidden="true">→</span></a>
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

      <section className="closing section-shell">
        <p className="section-kicker">Ready when you are</p>
        <h2>Less chaos.<br /><span>Clearer work.</span></h2>
        <a className="button button-primary" href="#top">Start with a clearer view <span aria-hidden="true">↑</span></a>
      </section>

      <footer className="site-footer section-shell">
        <div><strong>Mohammed Alsawat</strong><span>Workflow Systems · Task Tools · Simple AI</span></div>
        <p>Riyadh, Saudi Arabia · Available for selected consulting projects</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
