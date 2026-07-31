"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
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

const colombiaPath =
  "M183 20 L221 31 L250 58 L274 68 L286 98 L276 129 L293 157 L279 189 L260 215 L251 249 L225 281 L204 266 L190 237 L166 218 L157 189 L139 164 L144 129 L129 105 L144 75 L159 58 Z"

/** Siluetas continentales más legibles (vista estilizada 2D) */
const continents = [
  {
    id: "americas",
    d: "M48 72 C62 48 88 42 108 58 C122 70 118 92 104 108 C96 118 88 138 78 152 C70 164 58 168 50 156 C42 140 36 118 40 98 C42 86 40 78 48 72 Z M96 158 C108 162 118 182 112 204 C106 222 94 238 82 228 C74 210 78 186 86 170 C90 162 92 158 96 158 Z",
  },
  {
    id: "europe-africa",
    d: "M218 58 C238 48 258 52 268 68 C274 80 266 92 252 96 C240 88 228 78 218 70 Z M232 108 C248 104 266 118 270 142 C274 168 262 198 246 214 C232 226 218 218 214 196 C210 168 216 132 232 108 Z",
  },
  {
    id: "asia-oceania",
    d: "M292 62 C318 48 352 54 372 78 C388 98 392 122 378 138 C360 142 338 134 320 122 C308 112 296 96 292 78 Z M348 158 C368 152 390 168 386 188 C382 204 360 210 346 198 C338 186 340 166 348 158 Z M400 216 C412 212 424 224 418 236 C410 244 398 240 396 228 Z",
  },
]

const worldRoutes = [
  {
    id: "na",
    label: "Norteamérica",
    market: "Fine-Flavor",
    path: "M152 168 C120 120 100 96 86 88",
    end: { x: 86, y: 88 },
    color: "#F2C830",
  },
  {
    id: "eu",
    label: "Europa",
    market: "Bean-to-bar",
    path: "M152 168 C190 110 230 78 252 72",
    end: { x: 252, y: 72 },
    color: "#E8C9A0",
  },
  {
    id: "as",
    label: "Asia",
    market: "HoReCa",
    path: "M152 168 C210 140 280 118 348 108",
    end: { x: 348, y: 108 },
    color: "#FF6A3D",
  },
  {
    id: "af",
    label: "África",
    market: "Origen ↔ intercambio",
    path: "M152 168 C190 160 220 170 248 188",
    end: { x: 248, y: 188 },
    color: "#87AA27",
  },
]

const COL = { x: 152, y: 168 }

function MapIconDefs() {
  return (
    <defs>
      <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Mazorca Colab — icono vectorial */}
      <symbol id="icon-mazorca" viewBox="0 0 24 32">
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
        <path
          d="M9 9c.6 2.4.6 6 0 11M15 10c-.5 2.2-.5 5.5 0 10"
          stroke="#1A2E10"
          strokeWidth=".7"
          fill="none"
          opacity=".3"
        />
      </symbol>
      {/* Ardilla simplificada — marca Colab */}
      <symbol id="icon-squirrel" viewBox="0 0 32 30">
        <path d="M10 24 C2 20 1 12 5 7 C8 3 14 5 13 10 C12 14 10 17 11 20 C12 22 11 24 10 24Z" fill="#C8A010" />
        <ellipse cx="15" cy="22" rx="6" ry="6.5" fill="#F2C830" />
        <circle cx="19" cy="11" r="6" fill="#F2C830" />
        <path d="M14 7 Q13 2 17 1.5 Q21 1.2 19.5 7Z" fill="#F2C830" />
        <circle cx="21" cy="10" r="1.3" fill="#1A2E10" />
        <ellipse cx="26" cy="13.5" rx="2.2" ry="1.6" fill="#A05E10" />
        <ellipse cx="27.5" cy="20" rx="3.2" ry="4.2" fill="#3D7A2C" />
      </symbol>
      <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F2C830" stopOpacity=".9" />
        <stop offset="100%" stopColor="#FF6A3D" stopOpacity=".7" />
      </linearGradient>
    </defs>
  )
}

export default function BrandNetwork({ founders, collaborators, comingSoonSlots, territories }: Props) {
  const [selectedId, setSelectedId] = useState("bogota")
  const selectedTerritory = territories.find((territory) => territory.id === selectedId) ?? territories[0]
  const brands = useMemo(() => [...founders, ...collaborators], [founders, collaborators])
  const selectedBrand = brands.find((brand) => brand.territoryId === selectedTerritory?.id)
  const center = territories.find((territory) => territory.id === "bogota")

  return (
    <div className="ecosystem-map">
      <div className="grid lg:grid-cols-[.78fr_1.22fr] gap-4">
        <section className="map-panel map-world" aria-labelledby="world-title">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="eyebrow text-colab-yellow">Escala global</p>
              <h3 id="world-title" className="font-serif text-2xl font-bold text-colab-cream mt-2">
                Colombia conectada
                <br />
                con el mundo.
              </h3>
            </div>
            <span className="map-index">01</span>
          </div>

          <svg
            viewBox="0 0 430 280"
            className="w-full mt-3 world-map-svg"
            role="img"
            aria-label="Mapamundi animado: Colombia irradia hacia mercados globales con iconos Colab"
          >
            <MapIconDefs />

            {/* Océano / atmósfera */}
            <rect width="430" height="280" fill="url(#ocean)" opacity="0" />
            <circle cx="215" cy="140" r="118" className="world-orbit" />
            <circle cx="215" cy="140" r="118" className="world-orbit world-orbit--delay" />

            {continents.map((c, index) => (
              <motion.path
                key={c.id}
                d={c.d}
                className="world-land"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 0.22 + index * 0.04, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                style={{ transformOrigin: "215px 140px" }}
              />
            ))}

            {/* Rutas animadas + paquetes mazorca */}
            {worldRoutes.map((route, index) => (
              <g key={route.id} className="world-route">
                <motion.path
                  id={`route-${route.id}`}
                  d={route.path}
                  fill="none"
                  stroke={route.color}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="5 7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.75 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + index * 0.15 }}
                  className="world-route-line"
                />
                {/* Pulso viajero a lo largo de la ruta */}
                <circle r="3.5" fill={route.color} filter="url(#mapGlow)" className="world-packet">
                  <animateMotion
                    dur={`${3.2 + index * 0.4}s`}
                    repeatCount="indefinite"
                    path={route.path}
                    begin={`${index * 0.35}s`}
                  />
                </circle>
                {/* Icono mazorca en destino */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 160, delay: 0.55 + index * 0.12 }}
                  style={{ transformOrigin: `${route.end.x}px ${route.end.y}px` }}
                >
                  <circle cx={route.end.x} cy={route.end.y} r="11" fill="#101D0B" stroke={route.color} strokeWidth="1.4" />
                  <use
                    href="#icon-mazorca"
                    x={route.end.x - 6}
                    y={route.end.y - 9}
                    width="12"
                    height="16"
                    color={route.color}
                  />
                  <text
                    x={route.end.x}
                    y={route.end.y + 22}
                    textAnchor="middle"
                    fill="#F7F1EE"
                    fontSize="8"
                    fontWeight="800"
                    opacity=".85"
                  >
                    {route.label}
                  </text>
                  <text
                    x={route.end.x}
                    y={route.end.y + 32}
                    textAnchor="middle"
                    fill={route.color}
                    fontSize="6.5"
                    fontWeight="700"
                    opacity=".7"
                  >
                    {route.market}
                  </text>
                </motion.g>
              </g>
            ))}

            {/* Origen Colombia · ardilla Colab */}
            <g className="world-origin">
              <motion.circle
                cx={COL.x}
                cy={COL.y}
                r="22"
                fill="none"
                stroke="#F2C830"
                strokeWidth="1"
                initial={{ opacity: 0.15, scale: 0.8 }}
                animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.85, 1.15, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                style={{ transformOrigin: `${COL.x}px ${COL.y}px` }}
              />
              <motion.circle
                cx={COL.x}
                cy={COL.y}
                r="14"
                fill="none"
                stroke="#FF6A3D"
                strokeWidth="1"
                animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.25, 1] }}
                transition={{ duration: 2.8, delay: 0.4, repeat: Infinity }}
                style={{ transformOrigin: `${COL.x}px ${COL.y}px` }}
              />
              <circle cx={COL.x} cy={COL.y} r="13" fill="#1A2E10" stroke="#F2C830" strokeWidth="1.8" filter="url(#mapGlow)" />
              <use href="#icon-squirrel" x={COL.x - 12} y={COL.y - 12} width="24" height="22" />
              <text x={COL.x + 18} y={COL.y - 4} fill="#F7F1EE" fontSize="10" fontWeight="800">
                COLOMBIA
              </text>
              <text x={COL.x + 18} y={COL.y + 8} fill="#F2C830" fontSize="7" fontWeight="700">
                epicentro Colab
              </text>
            </g>
          </svg>

          <p className="text-xs leading-relaxed text-colab-cream/45 mt-1">
            La red nace en territorios colombianos. Las mazorcas marcan mercados por conectar — no
            exportaciones confirmadas.
          </p>
        </section>

        <section className="map-panel map-colombia" aria-labelledby="colombia-title">
          <div className="flex justify-between items-start gap-4 relative z-10">
            <div>
              <p className="eyebrow text-colab-green">Red territorial</p>
              <h3 id="colombia-title" className="font-serif text-2xl font-bold text-colab-ink mt-2">
                Un país.
                <br />
                Seis nodos vivos.
              </h3>
            </div>
            <span className="map-index text-colab-ink/15">02</span>
          </div>
          <svg viewBox="0 0 420 310" className="w-full -mt-7" role="group" aria-label="Mapa de nodos regionales de Cacao Colab">
            <MapIconDefs />
            <path d={colombiaPath} fill="#1A2E10" opacity=".06" stroke="#1A2E10" strokeWidth="1.2" />
            {center &&
              territories
                .filter((territory) => territory.id !== "bogota")
                .map((territory, index) => (
                  <motion.line
                    key={territory.id}
                    x1={center.mapX}
                    y1={center.mapY}
                    x2={territory.mapX}
                    y2={territory.mapY}
                    stroke={territory.accentColor}
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className="colombia-link"
                  />
                ))}
            {territories.map((territory, index) => {
              const active = territory.id === selectedId
              const isCenter = territory.id === "bogota"
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
                  className="cursor-pointer colombia-node"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.2 + index * 0.07 }}
                  style={{ transformOrigin: `${territory.mapX}px ${territory.mapY}px` }}
                >
                  {active && (
                    <circle
                      cx={territory.mapX}
                      cy={territory.mapY}
                      r={isCenter ? 22 : 17}
                      fill={territory.accentColor}
                      opacity=".16"
                    />
                  )}
                  <circle
                    cx={territory.mapX}
                    cy={territory.mapY}
                    r={isCenter ? 12 : 10}
                    fill="#F7F1EE"
                    stroke={territory.accentColor}
                    strokeWidth={active ? 2.5 : 1.6}
                  />
                  {isCenter ? (
                    <use
                      href="#icon-squirrel"
                      x={territory.mapX - 9}
                      y={territory.mapY - 9}
                      width="18"
                      height="17"
                    />
                  ) : (
                    <use
                      href="#icon-mazorca"
                      x={territory.mapX - 5}
                      y={territory.mapY - 8}
                      width="10"
                      height="14"
                      color={territory.accentColor}
                    />
                  )}
                  <text
                    x={territory.mapX + (territory.mapX > 240 ? 14 : -14)}
                    y={territory.mapY - 9}
                    textAnchor={territory.mapX > 240 ? "start" : "end"}
                    fill="#1C3B26"
                    fontSize={isCenter ? "10" : "9"}
                    fontWeight="800"
                  >
                    {territory.nodeName}
                  </text>
                  <text
                    x={territory.mapX + (territory.mapX > 240 ? 14 : -14)}
                    y={territory.mapY + 3}
                    textAnchor={territory.mapX > 240 ? "start" : "end"}
                    fill="#1C3B26"
                    opacity=".5"
                    fontSize="7"
                  >
                    {territory.city}
                  </text>
                </motion.g>
              )
            })}
          </svg>
          <div className="flex flex-wrap gap-2">
            {territories.map((territory) => (
              <button
                key={territory.id}
                type="button"
                onClick={() => setSelectedId(territory.id)}
                className={`map-chip ${selectedId === territory.id ? "map-chip-active" : ""}`}
              >
                <span style={{ background: territory.accentColor }} />
                {territory.name}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="grid lg:grid-cols-[1fr_.62fr] gap-4 mt-4">
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
