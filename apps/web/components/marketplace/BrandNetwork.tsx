"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { Brand } from "@/lib/brands"
import type { Territory } from "@/lib/territories"
import BrandCard from "./BrandCard"

type ComingSoon = { id: string; hint: string }

type Props = {
  founders: Brand[]
  collaborators: Brand[]
  comingSoonSlots: ComingSoon[]
  territories: Territory[]
}

/** Silueta Colombia más reconocible (Andes / Caribe / Orinoquía / Amazonía). */
const colombiaPath =
  "M198 28 C214 24 232 30 246 42 C258 52 268 62 276 78 C284 96 282 112 274 128 C288 142 296 160 292 178 C288 198 274 214 262 232 C252 248 244 268 228 286 C214 298 200 292 192 274 C184 252 178 234 166 218 C152 200 140 186 136 168 C132 148 138 132 148 116 C140 100 138 84 150 68 C162 50 178 34 198 28 Z"

/** Continentes estilizados — atlas entrañable, no GIS. */
const continents = [
  {
    id: "americas",
    d: "M42 64 C58 40 86 36 108 52 C124 66 120 90 104 108 C94 122 86 146 74 164 C64 180 50 184 42 168 C34 148 28 120 34 96 C38 80 34 70 42 64 Z M90 172 C104 176 118 198 110 222 C102 244 86 258 74 246 C66 224 72 196 82 178 C86 172 88 172 90 172 Z",
  },
  {
    id: "europe-africa",
    d: "M214 52 C236 40 258 46 268 64 C274 78 264 90 248 94 C234 84 222 74 214 64 Z M228 106 C248 100 268 118 272 146 C276 178 262 212 244 228 C228 240 214 230 210 204 C206 170 214 130 228 106 Z",
  },
  {
    id: "asia-oceania",
    d: "M288 56 C318 40 356 48 378 76 C396 100 400 128 384 146 C364 150 340 140 320 126 C306 114 294 96 288 74 Z M344 162 C366 154 392 172 386 196 C380 214 356 220 342 206 C334 190 336 170 344 162 Z M398 220 C412 214 426 228 418 242 C408 250 396 244 394 230 Z",
  },
]

const worldRoutes = [
  {
    id: "na",
    label: "Norteamérica",
    market: "Fine-Flavor",
    path: "M148 172 C118 128 96 100 82 90",
    end: { x: 82, y: 90 },
    color: "#F2C830",
  },
  {
    id: "eu",
    label: "Europa",
    market: "Bean-to-bar",
    path: "M148 172 C188 118 228 84 250 74",
    end: { x: 250, y: 74 },
    color: "#E8C9A0",
  },
  {
    id: "as",
    label: "Asia",
    market: "HoReCa",
    path: "M148 172 C208 146 278 122 346 112",
    end: { x: 346, y: 112 },
    color: "#FF6A3D",
  },
  {
    id: "af",
    label: "África",
    market: "Intercambio",
    path: "M148 172 C186 164 218 176 246 194",
    end: { x: 246, y: 194 },
    color: "#87AA27",
  },
]

const COL = { x: 148, y: 172 }

/** Etiquetas Colombia: lado y offset para no solaparse en móvil. */
const labelSide: Record<string, "left" | "right" | "top"> = {
  bogota: "right",
  santander: "left",
  cundinamarca: "left",
  huila: "left",
  arauca: "right",
  meta: "right",
}

function MapIconDefs({ prefix = "map" }: { prefix?: string }) {
  return (
    <defs>
      <filter id={`${prefix}-glow`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="1.8" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id={`${prefix}-ocean`} cx="50%" cy="45%" r="65%">
        <stop offset="0%" stopColor="#1a2e10" stopOpacity=".35" />
        <stop offset="55%" stopColor="#0c1609" stopOpacity=".15" />
        <stop offset="100%" stopColor="#070c06" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${prefix}-colombia-fill`} x1="30%" y1="10%" x2="80%" y2="90%">
        <stop offset="0%" stopColor="#3D7A2C" stopOpacity=".14" />
        <stop offset="50%" stopColor="#F2C830" stopOpacity=".1" />
        <stop offset="100%" stopColor="#1A2E10" stopOpacity=".08" />
      </linearGradient>
      <symbol id={`${prefix}-mazorca`} viewBox="0 0 24 32">
        <ellipse cx="12" cy="28" rx="5" ry="1.4" fill="currentColor" opacity=".25" />
        <path
          d="M12 2.5c4.2 2 6.8 9 6.8 15.5 0 5.5-2.6 9.5-6.8 11C7.8 27.5 5.2 23.5 5.2 18 5.2 11.5 7.8 4.5 12 2.5Z"
          fill="currentColor"
        />
        <path
          d="M12 5c2.4 1.6 4 7 4 13 0 4.2-1.4 7.2-4 8.5"
          stroke="#1A2E10"
          strokeWidth="1"
          fill="none"
          opacity=".35"
        />
      </symbol>
      <symbol id={`${prefix}-squirrel`} viewBox="0 0 32 30">
        <path d="M10 24 C2 20 1 12 5 7 C8 3 14 5 13 10 C12 14 10 17 11 20 C12 22 11 24 10 24Z" fill="#C8A010" />
        <ellipse cx="15" cy="22" rx="6" ry="6.5" fill="#F2C830" />
        <circle cx="19" cy="11" r="6" fill="#F2C830" />
        <path d="M14 7 Q13 2 17 1.5 Q21 1.2 19.5 7Z" fill="#F2C830" />
        <circle cx="21" cy="10" r="1.3" fill="#1A2E10" />
        <ellipse cx="26" cy="13.5" rx="2.2" ry="1.6" fill="#A05E10" />
        <ellipse cx="27.5" cy="20" rx="3.2" ry="4.2" fill="#3D7A2C" />
      </symbol>
    </defs>
  )
}

function nodeLabelAnchor(id: string, x: number) {
  const side = labelSide[id] ?? (x > 230 ? "right" : "left")
  if (side === "top") return { x, y: -18, anchor: "middle" as const }
  if (side === "right") return { x: x + 16, y: -6, anchor: "start" as const }
  return { x: x - 16, y: -6, anchor: "end" as const }
}

export default function BrandNetwork({ founders, collaborators, comingSoonSlots, territories }: Props) {
  const reduceMotion = useReducedMotion()
  const [selectedId, setSelectedId] = useState("bogota")
  const selectedTerritory = territories.find((t) => t.id === selectedId) ?? territories[0]
  const brands = useMemo(() => [...founders, ...collaborators], [founders, collaborators])
  const selectedBrand = brands.find((brand) => brand.territoryId === selectedTerritory?.id)
  const center = territories.find((territory) => territory.id === "bogota")

  return (
    <div className="ecosystem-map">
      <div className="ecosystem-map-grid">
        {/* ── Mapamundi ── */}
        <section className="map-panel map-world" aria-labelledby="world-title">
          <div className="map-panel-head">
            <div>
              <p className="eyebrow text-colab-yellow">Escala global</p>
              <h3 id="world-title" className="map-panel-title map-panel-title--light">
                Colombia conectada
                <br />
                con el mundo.
              </h3>
            </div>
            <span className="map-index" aria-hidden>
              01
            </span>
          </div>

          <div className="map-svg-frame map-svg-frame--world">
            <svg
              viewBox="0 0 430 280"
              className="world-map-svg"
              role="img"
              aria-label="Mapamundi animado: Colombia irradia hacia mercados globales"
              preserveAspectRatio="xMidYMid meet"
            >
              <MapIconDefs prefix="world" />
              <ellipse cx="215" cy="142" rx="168" ry="112" fill="url(#world-ocean)" />
              {!reduceMotion && (
                <>
                  <circle cx="215" cy="140" r="122" className="world-orbit" />
                  <circle cx="215" cy="140" r="122" className="world-orbit world-orbit--delay" />
                </>
              )}

              {continents.map((c, index) => (
                <motion.path
                  key={c.id}
                  d={c.d}
                  className="world-land"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 0.2 + index * 0.045, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: index * 0.1, ease: "easeOut" }}
                  style={{ transformOrigin: "215px 140px" }}
                />
              ))}

              {worldRoutes.map((route, index) => (
                <g key={route.id} className="world-route">
                  <motion.path
                    id={`route-${route.id}`}
                    d={route.path}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeDasharray="4 8"
                    initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.35, delay: 0.15 + index * 0.12, ease: "easeInOut" }}
                    className="world-route-line"
                  />
                  {!reduceMotion && (
                    <g className="world-packet" filter="url(#world-glow)">
                      <animateMotion
                        dur={`${4 + index * 0.55}s`}
                        repeatCount="indefinite"
                        path={route.path}
                        begin={`${index * 0.5}s`}
                      />
                      <use href="#world-mazorca" width="10" height="13" color={route.color} x="-5" y="-7" />
                    </g>
                  )}
                  <motion.g
                    className="world-destination"
                    initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.5 + index * 0.1 }}
                    style={{ transformOrigin: `${route.end.x}px ${route.end.y}px` }}
                  >
                    {!reduceMotion && (
                      <motion.circle
                        cx={route.end.x}
                        cy={route.end.y}
                        r="14"
                        fill="none"
                        stroke={route.color}
                        strokeWidth="1"
                        animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.9, 1.15, 0.9] }}
                        transition={{ duration: 3.2 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: `${route.end.x}px ${route.end.y}px` }}
                      />
                    )}
                    <circle
                      cx={route.end.x}
                      cy={route.end.y}
                      r="12"
                      fill="#101D0B"
                      stroke={route.color}
                      strokeWidth="1.5"
                    />
                    <use
                      href="#world-mazorca"
                      x={route.end.x - 6}
                      y={route.end.y - 9}
                      width="12"
                      height="16"
                      color={route.color}
                    />
                    <text
                      className="map-label map-label--light"
                      x={route.end.x}
                      y={route.end.y + 24}
                      textAnchor="middle"
                      fill="#F7F1EE"
                      fontWeight="800"
                    >
                      {route.label}
                    </text>
                    <text
                      className="map-label-sub map-label--accent"
                      x={route.end.x}
                      y={route.end.y + 35}
                      textAnchor="middle"
                      fill={route.color}
                      fontWeight="700"
                    >
                      {route.market}
                    </text>
                  </motion.g>
                </g>
              ))}

              <g className="world-origin">
                {!reduceMotion && (
                  <>
                    <motion.circle
                      cx={COL.x}
                      cy={COL.y}
                      r="26"
                      fill="none"
                      stroke="#F2C830"
                      strokeWidth="1"
                      animate={{ opacity: [0.12, 0.4, 0.12], scale: [0.88, 1.18, 0.88] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: `${COL.x}px ${COL.y}px` }}
                    />
                    <motion.circle
                      cx={COL.x}
                      cy={COL.y}
                      r="17"
                      fill="none"
                      stroke="#FF6A3D"
                      strokeWidth="1"
                      animate={{ opacity: [0.18, 0.5, 0.18], scale: [1, 1.22, 1] }}
                      transition={{ duration: 3.4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: `${COL.x}px ${COL.y}px` }}
                    />
                  </>
                )}
                <motion.g
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -2.5, 0] }
                  }
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle
                    cx={COL.x}
                    cy={COL.y}
                    r="14"
                    fill="#1A2E10"
                    stroke="#F2C830"
                    strokeWidth="2"
                    filter="url(#world-glow)"
                  />
                  <use href="#world-squirrel" x={COL.x - 12} y={COL.y - 12} width="24" height="22" />
                </motion.g>
                <text className="map-label map-label--light" x={COL.x + 20} y={COL.y - 2} fill="#F7F1EE" fontWeight="800">
                  COLOMBIA
                </text>
                <text className="map-label-sub" x={COL.x + 20} y={COL.y + 11} fill="#F2C830" fontWeight="700">
                  epicentro Colab
                </text>
              </g>
            </svg>
          </div>

          <p className="map-caption map-caption--light">
            La red nace en territorios colombianos. Las mazorcas marcan mercados por conectar — no
            exportaciones confirmadas.
          </p>
        </section>

        {/* ── Colombia ── */}
        <section className="map-panel map-colombia" aria-labelledby="colombia-title">
          <div className="map-panel-head">
            <div>
              <p className="eyebrow text-colab-green">Red territorial</p>
              <h3 id="colombia-title" className="map-panel-title">
                Un país.
                <br />
                Seis nodos vivos.
              </h3>
            </div>
            <span className="map-index map-index--dark" aria-hidden>
              02
            </span>
          </div>

          <div className="map-svg-frame map-svg-frame--colombia">
            <svg
              viewBox="0 0 420 310"
              className="colombia-map-svg"
              role="group"
              aria-label="Mapa de nodos regionales de Cacao Colab"
              preserveAspectRatio="xMidYMid meet"
            >
              <MapIconDefs prefix="co" />
              <motion.path
                d={colombiaPath}
                fill="url(#co-colombia-fill)"
                stroke="#1A2E10"
                strokeWidth="1.4"
                strokeLinejoin="round"
                className="colombia-land"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ transformOrigin: "210px 160px" }}
              />
              {!reduceMotion && (
                <motion.path
                  d={colombiaPath}
                  fill="none"
                  stroke="#F2C830"
                  strokeWidth="1"
                  strokeOpacity=".25"
                  animate={{ strokeOpacity: [0.12, 0.32, 0.12] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {center &&
                territories
                  .filter((territory) => territory.id !== "bogota")
                  .map((territory, index) => {
                    const linkPath = `M${center.mapX} ${center.mapY} L${territory.mapX} ${territory.mapY}`
                    return (
                      <g key={`link-${territory.id}`}>
                        <motion.path
                          d={linkPath}
                          fill="none"
                          stroke={territory.accentColor}
                          strokeWidth="1.4"
                          strokeDasharray="3 6"
                          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: selectedId === territory.id ? 0.85 : 0.4 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.07 }}
                          className={`colombia-link ${selectedId === territory.id ? "colombia-link--active" : ""}`}
                        />
                        {!reduceMotion && (
                          <circle r="2.4" fill={territory.accentColor} opacity=".85">
                            <animateMotion
                              dur={`${5.5 + index * 0.4}s`}
                              repeatCount="indefinite"
                              path={linkPath}
                              begin={`${index * 0.6}s`}
                            />
                          </circle>
                        )}
                      </g>
                    )
                  })}

              {territories.map((territory, index) => {
                const active = territory.id === selectedId
                const isCenter = territory.id === "bogota"
                const label = nodeLabelAnchor(territory.id, territory.mapX)
                const hitR = isCenter ? 28 : 24
                return (
                  <motion.g
                    key={territory.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${territory.nodeName}, ${territory.city}, ${territory.name}`}
                    aria-pressed={active}
                    onClick={() => setSelectedId(territory.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        setSelectedId(territory.id)
                      }
                    }}
                    className={`colombia-node ${active ? "colombia-node--active" : ""}`}
                    initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.96 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.15 + index * 0.06 }}
                    style={{ transformOrigin: `${territory.mapX}px ${territory.mapY}px` }}
                  >
                    {/* Hit area táctil */}
                    <circle
                      cx={territory.mapX}
                      cy={territory.mapY}
                      r={hitR}
                      fill="transparent"
                      className="colombia-node-hit"
                    />
                    {active && !reduceMotion && (
                      <motion.circle
                        cx={territory.mapX}
                        cy={territory.mapY}
                        r={isCenter ? 24 : 20}
                        fill={territory.accentColor}
                        opacity={0.14}
                        animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: `${territory.mapX}px ${territory.mapY}px` }}
                      />
                    )}
                    <motion.g
                      animate={
                        reduceMotion
                          ? undefined
                          : { y: [0, isCenter ? -3 : -2, 0] }
                      }
                      transition={{
                        duration: 2.8 + (index % 3) * 0.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.18,
                      }}
                    >
                      <circle
                        cx={territory.mapX}
                        cy={territory.mapY}
                        r={isCenter ? 13 : 11}
                        fill="#F7F1EE"
                        stroke={territory.accentColor}
                        strokeWidth={active ? 2.8 : 1.7}
                        filter={active ? "url(#co-glow)" : undefined}
                      />
                      {isCenter ? (
                        <use
                          href="#co-squirrel"
                          x={territory.mapX - 10}
                          y={territory.mapY - 10}
                          width="20"
                          height="18"
                        />
                      ) : (
                        <use
                          href="#co-mazorca"
                          x={territory.mapX - 5.5}
                          y={territory.mapY - 8}
                          width="11"
                          height="15"
                          color={territory.accentColor}
                        />
                      )}
                    </motion.g>
                    <g className="colombia-node-label">
                      <text
                        className="map-label map-label--dark"
                        x={label.x}
                        y={territory.mapY + label.y}
                        textAnchor={label.anchor}
                        fill="#1C3B26"
                        fontWeight="800"
                      >
                        {territory.nodeName}
                      </text>
                      <text
                        className="map-label-sub map-label--muted"
                        x={label.x}
                        y={territory.mapY + label.y + 12}
                        textAnchor={label.anchor}
                        fill="#1C3B26"
                      >
                        {territory.city}
                      </text>
                    </g>
                  </motion.g>
                )
              })}
            </svg>
          </div>

          <div className="map-chip-row" role="list">
            {territories.map((territory) => (
              <button
                key={territory.id}
                type="button"
                role="listitem"
                onClick={() => setSelectedId(territory.id)}
                className={`map-chip ${selectedId === territory.id ? "map-chip-active" : ""}`}
                aria-pressed={selectedId === territory.id}
              >
                <span style={{ background: territory.accentColor }} />
                {territory.name}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="ecosystem-map-footer">
        {selectedBrand ? <BrandCard brand={selectedBrand} /> : null}
        <aside className="open-circle-card">
          <p className="eyebrow text-colab-yellow">Círculo abierto</p>
          <h3 className="font-serif text-3xl font-bold text-colab-cream mt-3">
            El próximo nodo puede ser el tuyo.
          </h3>
          <p className="text-sm leading-relaxed text-colab-cream/55 mt-4">
            No necesitas ceder tu identidad. Trae trazabilidad, voluntad de aprender y algo real que
            aportar al ecosistema.
          </p>
          <div className="space-y-2 mt-6">
            {comingSoonSlots.map((slot) => (
              <a
                key={slot.id}
                href="https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20abrir%20un%20nodo%20o%20pautar%20mi%20marca."
                target="_blank"
                rel="noopener noreferrer"
                className="open-slot"
              >
                <span>＋</span>
                {slot.hint}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
