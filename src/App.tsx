import { useEffect, useMemo, useRef, useState } from 'react';
import { copyText, PROMPT, toBlocks } from './lib';

type CopyState = 'idle' | 'ok' | 'error';

function useCopy() {
  const [state, setState] = useState<CopyState>('idle');
  const t = useRef<number | undefined>(undefined);
  const copy = async () => {
    const ok = await copyText(PROMPT);
    setState(ok ? 'ok' : 'error');
    window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setState('idle'), ok ? 2500 : 6000);
  };
  return { state, copy };
}

function CopyButton({ variant, label }: { variant: 'primary' | 'ghost'; label: string }) {
  const { state, copy } = useCopy();
  return (
    <button className={`btn btn-${variant} ${state === 'ok' ? 'is-ok' : ''}`} onClick={copy} aria-live="polite">
      {state === 'ok' ? 'Prompt copiado' : state === 'error' ? 'No se pudo copiar' : label}
    </button>
  );
}

const STEPS = [
  'Copia el prompt completo.',
  'Abre Claude.',
  'Pega el prompt en Claude.',
  'Sigue las instrucciones para construir y desplegar tu aplicación.',
  'Configura las cuentas y servicios necesarios cuando Claude te lo solicite.',
];

export default function App() {
  const blocks = useMemo(() => toBlocks(PROMPT), []);
  const words = useMemo(() => PROMPT.split(/\s+/).length, []);
  const promptRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [showBar, setShowBar] = useState(false);
  const bar = useCopy();

  // barra flotante de copiar: aparece cuando el hero ya no se ve
  useEffect(() => {
    const el = heroRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header ref={heroRef} className="hero">
        <div className="hero-text">
          <h1 className="title">Progresión</h1>
          <p className="subtitle">Construye tu propia app de entrenamiento.</p>
          <p className="lead">
            Obtén gratis el prompt que utilicé como base para crear una aplicación de gimnasio que registra tus
            entrenamientos, analiza tu progreso y te ayuda a aplicar sobrecarga progresiva.
          </p>
          <div className="actions">
            <CopyButton variant="primary" label="Copiar prompt completo" />
            <a className="btn btn-ghost" href="#prompt">
              Ver prompt completo
            </a>
          </div>
        </div>
        <figure className="phone">
          <img
            src="/app-sesion.webp"
            width="600"
            height="1298"
            alt="Pantalla de la app Progresión durante una sesión: carga de 60 kg, 7 repeticiones, botón Terminé la serie y cronómetro de descanso con 1:28 restante."
            fetchPriority="high"
          />
          <figcaption>La app construida con este prompt, en plena sesión.</figcaption>
        </figure>
      </header>

      <main>
        <section className="how" aria-labelledby="how-title">
          <h2 id="how-title">¿Cómo utilizarlo?</h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="note">
            El prompt es gratuito, pero el desarrollo, los servicios externos y el despliegue pueden tener requisitos,
            límites o costes según las herramientas utilizadas.
          </p>
        </section>

        <section id="prompt" ref={promptRef} className="prompt" aria-labelledby="prompt-title">
          <div className="prompt-head">
            <div>
              <h2 id="prompt-title">El prompt completo</h2>
              <p className="meta">{words.toLocaleString('es-MX')} palabras, sin recortes.</p>
            </div>
            <CopyButton variant="primary" label="Copiar prompt" />
          </div>
          <article className="prompt-body" aria-label="Texto del prompt">
            {blocks.map((b, i) =>
              b.kind === 'h2' ? (
                <h3 key={i} className="p-h2">{b.text}</h3>
              ) : b.kind === 'h3' ? (
                <h4 key={i} className="p-h3">{b.text}</h4>
              ) : b.kind === 'ul' ? (
                <ul key={i}>
                  {b.items.map((it, k) => (
                    <li key={k}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </article>
          <div className="prompt-foot">
            <CopyButton variant="primary" label="Copiar prompt completo" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Prompt gratuito para uso personal. Úsalo, adáptalo a tu rutina y compártelo.</p>
      </footer>

      <div className={`bar ${showBar ? 'is-visible' : ''}`} aria-hidden={!showBar}>
        <button className={`btn btn-primary btn-block ${bar.state === 'ok' ? 'is-ok' : ''}`} onClick={bar.copy} tabIndex={showBar ? 0 : -1}>
          {bar.state === 'ok' ? 'Prompt copiado' : bar.state === 'error' ? 'No se pudo copiar' : 'Copiar prompt completo'}
        </button>
      </div>
    </>
  );
}
