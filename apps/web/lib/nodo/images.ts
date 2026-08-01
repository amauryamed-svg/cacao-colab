/** Convierte data URL → Buffer + mime para Storage o validación. */
export function parseDataUrl(dataUrl: string): { mime: string; buffer: Buffer } | null {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/i.exec(dataUrl)
  if (!match) return null
  const mime = match[1].toLowerCase()
  const buffer = Buffer.from(match[2], "base64")
  if (buffer.length === 0 || buffer.length > 520_000) return null
  return { mime, buffer }
}
