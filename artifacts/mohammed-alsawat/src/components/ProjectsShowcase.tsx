import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';
import { projects, previewUrl, type Project, type ProjectScreen } from '../data/projects';
import { ease, fadeUp, inView, staggerParent } from './motion';

const WHATSAPP_NUMBER = '966507850644';
/** The virtual screen size every preview is rendered at, before scaling. */
const VIRTUAL = { desktop: { w: 1280, h: 800 }, mobile: { w: 390, h: 800 } } as const;
const CHROME_H = 34; // fake browser bar height in the stage

const pad = (n: number) => String(n).padStart(2, '0');

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function useElementSize<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function useNearViewport<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near]);
  return near;
}

/** An iframe rendered at a fixed virtual size and scaled down to fit its box. */
function ScaledFrame({
  src,
  vw,
  vh,
  title,
  interactive,
  iframeRef,
  onLoad,
}: {
  src: string;
  vw: number;
  vh: number;
  title: string;
  interactive: boolean;
  iframeRef?: RefObject<HTMLIFrameElement | null>;
  onLoad?: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const { w } = useElementSize(boxRef);
  const scale = w ? w / vw : 0;
  return (
    <div ref={boxRef} className="scaled-frame" style={{ aspectRatio: `${vw} / ${vh}` }}>
      {scale > 0 && (
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={interactive ? 0 : -1}
          aria-hidden={interactive ? undefined : true}
          onLoad={onLoad}
          style={{
            width: vw,
            height: vh,
            transform: `scale(${scale})`,
            pointerEvents: interactive ? 'auto' : 'none',
          }}
        />
      )}
    </div>
  );
}

/* ─── Card ─────────────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  hidden,
  onOpen,
}: {
  project: Project;
  index: number;
  hidden: boolean;
  onOpen: (slug: string) => void;
}) {
  const { lang, isAr, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const near = useNearViewport(ref);
  const v = VIRTUAL[project.platform];

  // Cursor-following "open" badge
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(mx, { stiffness: 380, damping: 32, mass: 0.6 });
  const by = useSpring(my, { stiffness: 380, damping: 32, mass: 0.6 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      className={`pcard pcard--${index === 0 ? 'lead' : 'std'}`}
      data-slug={project.slug}
    >
      <button
        type="button"
        className="pcard-hit"
        onClick={() => onOpen(project.slug)}
        onPointerMove={onMove}
        onPointerEnter={e => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-label={`${t('projects.open')}: ${project.name[lang]}`}
      >
        <motion.div
          layoutId={`frame-${project.slug}`}
          className={`pcard-stage pcard-stage--${project.platform}`}
          style={{ opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.7, ease }}
        >
          {project.platform === 'desktop' ? (
            <div className="device device--desktop device--thumb">
              <div className="device-bar" aria-hidden="true">
                <i /><i /><i />
              </div>
              {near && (
                <ScaledFrame
                  src={previewUrl(project.slug, { mode: 'thumb' })}
                  vw={v.w}
                  vh={v.h}
                  title={project.name[lang]}
                  interactive={false}
                />
              )}
            </div>
          ) : (
            <div className="device device--mobile device--thumb">
              {near && (
                <ScaledFrame
                  src={previewUrl(project.slug, { mode: 'thumb' })}
                  vw={v.w}
                  vh={v.h}
                  title={project.name[lang]}
                  interactive={false}
                />
              )}
            </div>
          )}
        </motion.div>

        <div className="pcard-meta">
          <span className="pcard-num">{pad(index + 1)}</span>
          <div className="pcard-copy">
            <motion.h3 layoutId={`title-${project.slug}`} transition={{ duration: 0.7, ease }}>
              {project.name[lang]}
            </motion.h3>
            <p>{project.tagline[lang]}</p>
          </div>
          <span className="pcard-arrow" aria-hidden="true">{isAr ? '↖' : '↗'}</span>
        </div>

        <AnimatePresence>
          {hover && (
            <motion.span
              className="pcard-cursor"
              aria-hidden="true"
              style={{ x: bx, y: by }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              {t('projects.cursor')}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.article>
  );
}

/* ─── Stage (expanded project) ─────────────────────────────────────────────── */

function DeviceViewport({
  project,
  morph,
  dir,
  activeScreen,
  iframeRef,
}: {
  project: Project;
  morph: boolean;
  dir: number;
  activeScreen: string | null;
  iframeRef: RefObject<HTMLIFrameElement | null>;
}) {
  const { lang, t } = useLang();
  const areaRef = useRef<HTMLDivElement>(null);
  const area = useElementSize(areaRef);
  const [loaded, setLoaded] = useState(false);
  const v = VIRTUAL[project.platform];

  // Fit the device inside the available area
  let devW = 0;
  let devH = 0;
  let scale = 1;
  let native = false;
  let frameW: number = v.w;
  let frameH: number = v.h;
  if (area.w && area.h) {
    if (project.platform === 'desktop') {
      devW = area.w;
      devH = area.h;
      if (area.w < 720) {
        // Phone-sized stage: let the (responsive) preview lay itself out natively.
        native = true;
      } else {
        // Fill the whole area with a desktop-sized canvas, scaled no smaller than 80%
        // so the text inside stays readable.
        scale = Math.min(1, Math.max(0.8, area.w / v.w));
        frameW = area.w / scale;
        frameH = (area.h - CHROME_H) / scale;
      }
    } else {
      scale = Math.min((area.h - 20) / v.h, (area.w - 20) / v.w, 1);
      devW = v.w * scale + 20;
      devH = v.h * scale + 20;
    }
  }

  // Initial screen is passed through the URL so the iframe never reloads afterwards.
  const [src] = useState(() =>
    previewUrl(project.slug, activeScreen ? { screen: activeScreen } : {}),
  );

  return (
    <div ref={areaRef} className="stage-viewport">
      {devW > 0 && (
        <motion.div
          layoutId={morph ? `frame-${project.slug}` : undefined}
          className={`device device--${project.platform} device--live`}
          style={{ width: devW, height: devH }}
          initial={morph ? false : { opacity: 0, x: dir * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={morph ? undefined : { opacity: 0, x: dir * -80 }}
          transition={{ duration: 0.7, ease }}
        >
          {project.platform === 'desktop' && (
            <div className="device-bar" aria-hidden="true">
              <i /><i /><i />
              <span className="device-url">alsawat.dev/projects/{project.slug}</span>
            </div>
          )}
          <div className="device-screen">
            <iframe
              ref={iframeRef}
              src={src}
              title={project.name[lang]}
              sandbox="allow-scripts allow-same-origin allow-popups"
              onLoad={() => setLoaded(true)}
              style={
                native
                  ? { width: '100%', height: '100%' }
                  : { width: frameW, height: frameH, transform: `scale(${scale})` }
              }
            />
            <AnimatePresence>
              {!loaded && (
                <motion.div
                  className="device-loading"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="device-loading-bar" />
                  <span>{t('projects.loading')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ProjectStage({
  index,
  originSlug,
  dir,
  onClose,
  onNav,
}: {
  index: number;
  originSlug: string;
  dir: number;
  onClose: () => void;
  onNav: (delta: number) => void;
}) {
  const { lang, isAr, t } = useLang();
  const project = projects[index];
  const morph = project.slug === originSlug;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [screens, setScreens] = useState<ProjectScreen[]>(project.screens);
  const [activeScreen, setActiveScreen] = useState<string | null>(project.screens[0]?.id ?? null);

  // Reset per project
  useEffect(() => {
    setScreens(project.screens);
    setActiveScreen(project.screens[0]?.id ?? null);
  }, [project]);

  // Talk to the preview iframe
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
      const d = e.data as { type?: string; id?: string; screens?: { id: string; label: string }[] };
      if (!d || typeof d !== 'object') return;
      if (d.type === 'pw:ready' && Array.isArray(d.screens)) {
        if (!project.screens.length) {
          setScreens(d.screens.map(s => ({ id: s.id, label: { ar: s.label, en: s.label } })));
        }
        setActiveScreen(a => a ?? d.screens?.[0]?.id ?? null);
      }
      if (d.type === 'pw:screen-changed' && typeof d.id === 'string') setActiveScreen(d.id);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [project]);

  const goScreen = useCallback((id: string) => {
    setActiveScreen(id);
    iframeRef.current?.contentWindow?.postMessage({ type: 'pw:screen', id }, '*');
  }, []);

  // Keyboard: Esc closes, arrows switch project (mirrored in RTL)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(isAr ? -1 : 1);
      if (e.key === 'ArrowLeft') onNav(isAr ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav, isAr]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  const waText = encodeURIComponent(
    isAr
      ? `مرحباً محمد، شاهدت مشروع «${project.name.ar}» في موقعك وأرغب في نظام مشابه.`
      : `Hi Mohammed, I saw “${project.name.en}” on your site and I'd like something similar.`,
  );

  return (
    <motion.div
      className="stage"
      role="dialog"
      aria-modal="true"
      aria-label={project.name[lang]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
      transition={{ duration: 0.35 }}
    >
      <div className="stage-top">
        <div className="stage-title">
          <span className="stage-count">
            {pad(index + 1)} <i>/</i> {pad(projects.length)}
          </span>
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.h3
              key={project.slug}
              layoutId={morph ? `title-${project.slug}` : undefined}
              initial={morph ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease }}
            >
              {project.name[lang]}
            </motion.h3>
          </AnimatePresence>
        </div>
        <div className="stage-controls">
          <button type="button" className="stage-btn" onClick={() => onNav(-1)} aria-label={t('projects.prev')}>
            {isAr ? '→' : '←'}
          </button>
          <button type="button" className="stage-btn" onClick={() => onNav(1)} aria-label={t('projects.next')}>
            {isAr ? '←' : '→'}
          </button>
          <button
            ref={closeRef}
            type="button"
            className="stage-btn stage-btn--close"
            onClick={onClose}
            aria-label={t('projects.close')}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="stage-body">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.aside
            key={project.slug}
            className="stage-info"
            variants={staggerParent(0.06, morph ? 0.25 : 0.05)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.p variants={fadeUp} className="stage-tagline">
              {project.tagline[lang]}
            </motion.p>

            <motion.div variants={fadeUp} className="stage-block">
              <h4>{t('projects.problem')}</h4>
              <p>{project.problem[lang]}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="stage-block">
              <h4>{t('projects.solution')}</h4>
              <p>{project.solution[lang]}</p>
            </motion.div>

            <motion.ul variants={fadeUp} className="stage-highlights">
              {project.highlights[lang].map(h => (
                <li key={h}>{h}</li>
              ))}
            </motion.ul>

            {screens.length > 0 && (
              <motion.div variants={fadeUp} className="stage-block">
                <h4>{t('projects.screens')}</h4>
                <LayoutGroup id={`screens-${project.slug}`}>
                  <div className="screen-chips" role="tablist">
                    {screens.map(s => {
                      const on = s.id === activeScreen;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          role="tab"
                          aria-selected={on}
                          className={`screen-chip${on ? ' is-on' : ''}`}
                          onClick={() => goScreen(s.id)}
                        >
                          {on && (
                            <motion.span
                              layoutId="screen-pill"
                              className="screen-chip-bg"
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
                          <span className="screen-chip-label">{s.label[lang]}</span>
                        </button>
                      );
                    })}
                  </div>
                </LayoutGroup>
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="stage-stack">
              {project.stack.map(s => (
                <span key={s}>{s}</span>
              ))}
              <span className="stage-flag">{t('projects.sample')}</span>
              {project.isPrivate && <span className="stage-flag">{t('projects.private')}</span>}
            </motion.div>

            <motion.div variants={fadeUp} className="stage-actions">
              <a
                className="button button-primary"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.similar')}
              </a>
              <a
                className="stage-link"
                href={previewUrl(project.slug)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.full')} <span aria-hidden="true">{isAr ? '↖' : '↗'}</span>
              </a>
              {project.repoUrl && (
                <a className="stage-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  {t('projects.code')} <span aria-hidden="true">{isAr ? '↖' : '↗'}</span>
                </a>
              )}
            </motion.div>
          </motion.aside>
        </AnimatePresence>

        <AnimatePresence mode="popLayout" initial={false}>
          <DeviceViewport
            key={project.slug}
            project={project}
            morph={morph}
            dir={isAr ? -dir : dir}
            activeScreen={activeScreen}
            iframeRef={iframeRef}
          />
        </AnimatePresence>
      </div>

      <p className="stage-hint">{t('projects.hint')}</p>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */

export default function ProjectsShowcase() {
  const { t } = useLang();
  const [state, setState] = useState<{ index: number; origin: string; dir: number } | null>(null);

  const open = useCallback((slug: string) => {
    const index = projects.findIndex(p => p.slug === slug);
    if (index < 0) return;
    setState({ index, origin: slug, dir: 1 });
    history.replaceState(null, '', `#project-${slug}`);
  }, []);

  const close = useCallback(() => {
    setState(s => {
      if (s) {
        // Return focus to the card we came from
        const slug = projects[s.index].slug;
        requestAnimationFrame(() =>
          document.querySelector<HTMLButtonElement>(`[data-slug="${slug}"] .pcard-hit`)?.focus({ preventScroll: true }),
        );
      }
      return null;
    });
    history.replaceState(null, '', '#projects');
  }, []);

  const nav = useCallback((delta: number) => {
    setState(s => {
      if (!s) return s;
      const index = (s.index + delta + projects.length) % projects.length;
      history.replaceState(null, '', `#project-${projects[index].slug}`);
      return { ...s, index, dir: delta };
    });
  }, []);

  // Deep link: #project-<slug>
  useEffect(() => {
    const m = location.hash.match(/^#project-(.+)$/);
    if (m) open(decodeURIComponent(m[1]));
  }, [open]);

  // Lock page scroll while the stage is open
  useEffect(() => {
    if (!state) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev;
    };
  }, [!!state]);

  const openSlug = state ? projects[state.index].slug : null;

  return (
    <section className="projects section-shell" id="projects">
      <motion.div className="projects-head" variants={staggerParent(0.1)} {...inView}>
        <motion.p variants={fadeUp} className="section-kicker">
          {t('projects.kicker')}
        </motion.p>
        <motion.h2 variants={fadeUp}>
          {t('projects.h2')
            .split('\n')
            .map((line, i) => (
              <span key={i} className={i === 1 ? 'projects-h2-em' : undefined}>
                {line}
              </span>
            ))}
        </motion.h2>
        <motion.p variants={fadeUp} className="projects-body">
          {t('projects.body')}
        </motion.p>
      </motion.div>

      <LayoutGroup id="projects">
        <motion.div className="projects-grid" variants={staggerParent(0.1)} {...inView}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              hidden={openSlug === p.slug && state?.origin === p.slug}
              onOpen={open}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {state && (
            <ProjectStage
              key="stage"
              index={state.index}
              originSlug={state.origin}
              dir={state.dir}
              onClose={close}
              onNav={nav}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
