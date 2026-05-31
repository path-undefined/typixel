export function hexToU32(color: string | null): number {
  if (!color) {
    return 0;
  }

  const hex = color.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0;
}

export function u32ToHex(u32: number): string | null {
  if (!u32) {
    return null;
  }

  const r = u32 & 0xFF;
  const g = (u32 >> 8) & 0xFF;
  const b = (u32 >> 16) & 0xFF;

  function toHex(c: number) {
    return c.toString(16).padStart(2, "0");
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
