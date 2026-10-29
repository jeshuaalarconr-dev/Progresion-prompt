import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { toBlocks } from '../src/lib';

const raw = readFileSync('src/content/prompt.md', 'utf8').replace(/\n+$/, '');

describe('prompt', () => {
  it('ningún renglón se pierde ni cambia al darle formato', () => {
    const rebuilt = toBlocks(raw).flatMap((b) => (b.kind === 'ul' ? b.items.map((i) => '- ' + i) : [b.text]));
    const original = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    expect(rebuilt).toEqual(original);
  });
  it('detecta títulos y secciones numeradas', () => {
    const b = toBlocks(raw);
    expect(b.filter((x) => x.kind === 'h2').map((x) => (x as { text: string }).text)).toEqual(['OBJETIVO', 'TECNOLOGÍA', 'FUNCIONALIDADES']);
    expect(b.filter((x) => x.kind === 'h3')).toHaveLength(7);
  });
});
