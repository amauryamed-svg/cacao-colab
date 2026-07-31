#!/usr/bin/env node
/**
 * Genera favicon.ico + apple-icon.png desde la ardilla con mazorca verde.
 * Uso: node scripts/generate-favicon.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const webApp = path.join(root, "apps/web/app")
const svgPath = path.join(webApp, "icon.svg")
const svg = fs.readFileSync(svgPath)

async function png(size) {
  return sharp(svg).resize(size, size).png().toBuffer()
}

function pngToIco(pngBuffers) {
  // ICO with multiple PNG images (Vista+)
  const count = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const entries = []
  let offset = headerSize + dirEntrySize * count
  for (const buf of pngBuffers) {
    const meta = Buffer.alloc(dirEntrySize)
    // 0 = 256 in ICO width/height bytes
    const dim = 0
    meta[0] = dim
    meta[1] = dim
    meta[2] = 0
    meta[3] = 0
    meta.writeUInt16LE(1, 4)
    meta.writeUInt16LE(32, 6)
    meta.writeUInt32LE(buf.length, 8)
    meta.writeUInt32LE(offset, 12)
    entries.push(meta)
    offset += buf.length
  }
  return Buffer.concat([header, ...entries, ...pngBuffers])
}

const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map(png))
const ico = pngToIco(pngs)
fs.writeFileSync(path.join(webApp, "favicon.ico"), ico)

const apple = await png(180)
fs.writeFileSync(path.join(webApp, "apple-icon.png"), apple)

const icon32 = await png(32)
fs.writeFileSync(path.join(webApp, "icon.png"), icon32)

console.log("Wrote favicon.ico, icon.png (32), apple-icon.png (180) from icon.svg")
