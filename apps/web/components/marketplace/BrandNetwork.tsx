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

const worldPaths = [
  "M22 83 L50 58 L93 51 L121 66 L137 91 L121 111 L92 113 L76 143 L52 132 L42 106 Z",
  "M116 145 L143 149 L155 178 L144 218 L126 251 L110 230 L103 190 Z",
  "M204 62 L235 50 L269 60 L286 79 L313 72 L349 88 L375 111 L363 136 L329 137 L306 125 L287 145 L261 132 L243 105 L213 102 Z",
  "M268 148 L294 151 L306 182 L293 226 L273 244 L252 213 L249 175 Z",
  "M351 190 L380 179 L401 194 L397 218 L368 226 L348 211 Z",
]

const worldTargets = [
  { label: "Norteamérica", x: 89, y: 91 },
  { label: "Europa", x: 257, y: 92 },
  { label: "Asia", x: 346, y: 112 },
]

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
                Colombia conectada<br />con el mundo.
              </h3>
            </div>
            <span className="map-index">01</span>
          </div>
          <svg viewBox="0 0 430 280" className="w-full mt-4" role="img" aria-label="Mapa mundial con Colombia como origen">
            {worldPaths.map((path, index) => (
              <path key={path} d={path} className="world-land" style={{ opacity: .2 + index * .03 }} />
            ))}
            {worldTargets.map((target, index) => (
              <g key={target.label}>
                <motion.path
                  d={`M133 174 Q${(133 + target.x) / 2} ${Math.min(35, target.y - 45)} ${target.x} ${target.y}`}
                  fill="none"
                  stroke="#F2C830"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: .45 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * .15 }}
                />
                <circle cx={target.x} cy={target.y} r="3" fill="#F2C830" opacity=".7" />
              </g>
            ))}
            <motion.circle
              cx="133"
              cy="174"
              r="7"
              fill="#F2C830"
              animate={{ r: [6, 10, 6], opacity: [1, .45, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <text x="145" y="179" fill="#F7F1EE" fontSize="10" fontWeight="700">COLOMBIA</text>
          </svg>
          <p className="text-xs leading-relaxed text-colab-cream/45">
            La red nace en territorios colombianos. Las líneas muestran mercados por conectar, no exportaciones confirmadas.
          </p>
        </section>

        <section className="map-panel map-colombia" aria-labelledby="colombia-title">
          <div className="flex justify-between items-start gap-4 relative z-10">
            <div>
              <p className="eyebrow text-colab-green">Red territorial</p>
              <h3 id="colombia-title" className="font-serif text-2xl font-bold text-colab-ink mt-2">
                Un país.<br />Seis nodos vivos.
              </h3>
            </div>
            <span className="map-index text-colab-ink/15">02</span>
          </div>
          <svg viewBox="0 0 420 310" className="w-full -mt-7" role="group" aria-label="Mapa de nodos regionales de Cacao Colab">
            <path d={colombiaPath} fill="#1A2E10" opacity=".06" stroke="#1A2E10" strokeWidth="1.2" />
            {center && territories.filter((territory) => territory.id !== "bogota").map((territory, index) => (
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
                whileInView={{ pathLength: 1, opacity: .55 }}
                viewport={{ once: true }}
                transition={{ duration: .7, delay: index * .08 }}
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
                  className="cursor-pointer"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.08 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, delay: .2 + index * .07 }}
                  style={{ transformOrigin: `${territory.mapX}px ${territory.mapY}px` }}
                >
                  {active && <circle cx={territory.mapX} cy={territory.mapY} r={isCenter ? 20 : 15} fill={territory.accentColor} opacity=".14" />}
                  <circle
                    cx={territory.mapX}
                    cy={territory.mapY}
                    r={isCenter ? 9 : 6}
                    fill={territory.accentColor}
                    stroke={isCenter ? "#1A2E10" : "#F7F1EE"}
                    strokeWidth={active ? 3 : 2}
                  />
                  <text
                    x={territory.mapX + (territory.mapX > 240 ? 11 : -11)}
                    y={territory.mapY - 9}
                    textAnchor={territory.mapX > 240 ? "start" : "end"}
                    fill="#1C3B26"
                    fontSize={isCenter ? "10" : "9"}
                    fontWeight="800"
                  >
                    {territory.nodeName}
                  </text>
                  <text
                    x={territory.mapX + (territory.mapX > 240 ? 11 : -11)}
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
                <span style={{ background: territory.accentColor }} />{territory.name}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="grid lg:grid-cols-[1fr_.62fr] gap-4 mt-4">
        {selectedBrand ? <BrandCard brand={selectedBrand} /> : null}
        <aside className="open-circle-card">
          <p className="eyebrow text-colab-yellow">Círculo abierto</p>
          <h3 className="font-serif text-3xl font-bold text-colab-cream mt-3">El próximo nodo puede ser el tuyo.</h3>
          <p className="text-sm leading-relaxed text-colab-cream/55 mt-4">
            No necesitas ceder tu identidad. Trae trazabilidad, voluntad de aprender y algo real que aportar al ecosistema.
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
                <span>＋</span>{slot.hint}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
