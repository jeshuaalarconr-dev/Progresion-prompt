import raw from './content/prompt.md?raw';

/** Texto exacto del prompt (sin el salto de línea final del archivo). */
export const PROMPT = raw.replace(/\r\n/g, '\n').replace(/\n+$/, '');

export type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] };

const isUpper = (s: string) => /[A-ZÁÉÍÓÚÑ]/.test(s) && s === s.toLocaleUpperCase('es');

/**
 * Convierte el prompt en bloques para mostrarlo con jerarquía.
 * No cambia ninguna palabra: solo decide si cada línea es título, lista o párrafo.
 */
export function toBlocks(text: string): Block[] {
  const out: Block[] = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('- ')) {
      const last = out[out.length - 1];
      if (last && last.kind === 'ul') last.items.push(t.slice(2));
      else out.push({ kind: 'ul', items: [t.slice(2)] });
    } else if (/^\d+\.\s/.test(t) && isUpper(t)) out.push({ kind: 'h3', text: t });
    else if (isUpper(t)) out.push({ kind: 'h2', text: t });
    else out.push({ kind: 'p', text: t });
  }
  return out;
}

/** Copia al portapapeles con Clipboard API y, si no existe o falla, con un textarea temporal. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* sigue con la alternativa */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.opacity = '0';
    ta.style.fontSize = '16px'; // evita el zoom de iOS
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
