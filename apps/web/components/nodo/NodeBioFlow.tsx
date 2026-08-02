"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import AuthConsentFields, { consentIsReady } from "@/components/legal/AuthConsentFields"
import { compressImageFile } from "@/lib/nodo/compress-image"
import { NODE_KIND_LABEL, type NodeKind } from "@/lib/nodo/types"

const STEPS = 5

const KINDS: { id: NodeKind; label: string; sub: string }[] = [
  { id: "finca", label: "Finca / origen", sub: "Cacaocultor, fermentación, lote" },
  { id: "marca", label: "Marca de cacao", sub: "Chocolate, nibs, cobertura, tienda" },
  { id: "transformacion", label: "Transformación", sub: "Bean-to-bar, laboratorio, maquila" },
  { id: "horeca", label: "Cocina / hospitalidad", sub: "Restaurante, pastelería, hotel, café" },
  { id: "otra", label: "Aliado", sub: "Educación, investigación, nodo territorial" },
]

type FormState = {
  kind: NodeKind | ""
  displayName: string
  orgName: string
  city: string
  territory: string
  intro: string
  avatarDataUrl: string
  productDataUrl: string
  productCaption: string
  email: string
  whatsapp: string
  instagram: string
}

const initial: FormState = {
  kind: "",
  displayName: "",
  orgName: "",
  city: "",
  territory: "",
  intro: "",
  avatarDataUrl: "",
  productDataUrl: "",
  productCaption: "",
  email: "",
  whatsapp: "",
  instagram: "",
}

export default function NodeBioFlow({
  presetEmail,
  presetName,
  presetOrg,
  presetCity,
  returnTo = "/cuenta",
}: {
  presetEmail?: string
  presetName?: string
  presetOrg?: string
  presetCity?: string
  /** Tras publicar, enlace de vuelta al espacio personal. */
  returnTo?: string
}) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({
    ...initial,
    email: presetEmail ?? "",
    displayName: presetName ?? "",
    orgName: presetOrg ?? "",
    city: presetCity ?? "",
  })
  const [privacy, setPrivacy] = useState(false)
  const [terms, setTerms] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [error, setError] = useState("")
  const [sharePath, setSharePath] = useState("")
  const [copied, setCopied] = useState(false)
  const [pending, startTransition] = useTransition()

  const canAdvance = useMemo(() => {
    if (step === 0) return form.kind !== ""
    if (step === 1) return form.displayName.trim().length > 1 && form.orgName.trim().length > 1 && form.city.trim().length > 1
    if (step === 2) return form.intro.trim().length >= 40 && Boolean(form.avatarDataUrl)
    if (step === 3) return Boolean(form.productDataUrl)
    if (step === 4) return form.email.includes("@") && consentIsReady(privacy, terms)
    return true
  }, [step, form, privacy, terms])

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onFile(key: "avatarDataUrl" | "productDataUrl", file: File | null) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Sube una imagen (JPG, PNG o WebP).")
      return
    }
    try {
      const dataUrl = await compressImageFile(file)
      set(key, dataUrl)
      setError("")
    } catch {
      setError("No se pudo procesar esa imagen.")
    }
  }

  function submit() {
    if (!canAdvance || pending) return
    startTransition(async () => {
      setError("")
      try {
        const res = await fetch("/api/onboarding/node-bio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            privacy_accepted: privacy,
            terms_accepted: terms,
            marketing_opt_in: marketing,
          }),
        })
        const json = (await res.json()) as { ok: boolean; error?: string; sharePath?: string }
        if (!json.ok || !json.sharePath) {
          setError(json.error ?? "No se pudo publicar la bio.")
          return
        }
        setSharePath(json.sharePath)
        setStep(STEPS)
      } catch {
        setError("Error de red. Intenta de nuevo.")
      }
    })
  }

  async function copyLink() {
    const url = `${window.location.origin}${sharePath}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Copia manualmente el enlace de abajo.")
    }
  }

  if (step >= STEPS && sharePath) {
    const full = typeof window !== "undefined" ? `${window.location.origin}${sharePath}` : sharePath
    return (
      <div className="nodo-bio-done">
        <p className="eyebrow text-colab-yellow">Red Colab activa</p>
        <h2 className="nodo-bio-title">
          Tu nodo ya tiene
          <br />
          <em>enlace vivo.</em>
        </h2>
        <p className="nodo-bio-lede">
          Compártelo con aliados, compradores y tu equipo. Cada bio suma conectividad a la comunidad
          colectiva del cacao.
        </p>
        <code className="nodo-bio-link">{full}</code>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button type="button" className="nodo-bio-primary" onClick={copyLink}>
            {copied ? "Copiado ✓" : "Copiar enlace →"}
          </button>
          <Link href={sharePath} className="nodo-bio-ghost">
            Ver mi bio pública →
          </Link>
          <Link href={returnTo} className="nodo-bio-ghost">
            Volver a Mi cuenta →
          </Link>
          <Link href="/nodo" className="nodo-bio-ghost">
            Ver la red de nodos →
          </Link>
        </div>
        <a
          className="nodo-bio-wa mt-4"
          href={`https://wa.me/?text=${encodeURIComponent(`Te comparto mi nodo en Cacao Colab: ${full}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar por WhatsApp →
        </a>
      </div>
    )
  }

  return (
    <div className="nodo-bio-flow">
      <div className="flex gap-2 mb-8" aria-label={`Paso ${step + 1} de ${STEPS}`}>
        {Array.from({ length: STEPS }).map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === step ? 28 : 8,
              background: i <= step ? "#F2C830" : "rgba(247,241,238,.2)",
            }}
          />
        ))}
      </div>

      {step === 0 && (
        <section>
          <p className="eyebrow text-colab-yellow">Bio de nodo</p>
          <h2 className="nodo-bio-title">
            ¿Qué eres en
            <br />
            la <em>cadena?</em>
          </h2>
          <p className="nodo-bio-lede">Según tu rol en el Colab armamos tu perfil para la red interna.</p>
          <div className="grid gap-2 mt-6">
            {KINDS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nodo-bio-option ${form.kind === item.id ? "is-on" : ""}`}
                onClick={() => set("kind", item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.sub}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section>
          <p className="eyebrow text-colab-yellow">Identidad del nodo</p>
          <h2 className="nodo-bio-title">
            Nombre, finca
            <br />
            o <em>marca.</em>
          </h2>
          <div className="grid gap-4 mt-6">
            <Field label="Tu nombre" value={form.displayName} onChange={(v) => set("displayName", v)} placeholder="Amaury Amed" />
            <Field
              label={form.kind === "finca" ? "Nombre de la finca" : "Nombre de la marca / operación"}
              value={form.orgName}
              onChange={(v) => set("orgName", v)}
              placeholder="Ej. Finca El Surco · Chocolate X"
            />
            <Field label="Ciudad / municipio" value={form.city} onChange={(v) => set("city", v)} placeholder="Arauquita, Arauca" />
            <Field
              label="Territorio / región (opcional)"
              value={form.territory}
              onChange={(v) => set("territory", v)}
              placeholder="Arauca · Huila · Santander…"
            />
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <p className="eyebrow text-colab-yellow">Foto + intro</p>
          <h2 className="nodo-bio-title">
            Preséntate al
            <br />
            <em>mundo del cacao.</em>
          </h2>
          <p className="nodo-bio-lede">Foto de perfil y un párrafo que diga quién eres y qué buscas en el Colab.</p>
          <label className="nodo-bio-upload mt-6">
            <span>Foto de perfil</span>
            <input type="file" accept="image/*" onChange={(e) => void onFile("avatarDataUrl", e.target.files?.[0] ?? null)} />
            {form.avatarDataUrl ? (
              <Image src={form.avatarDataUrl} alt="Vista previa perfil" width={112} height={112} className="nodo-bio-preview" unoptimized />
            ) : (
              <em>Subir foto →</em>
            )}
          </label>
          <label className="block mt-5">
            <span className="eyebrow text-colab-cream/45">Intro / bio</span>
            <textarea
              className="nodo-bio-textarea"
              rows={5}
              maxLength={2000}
              value={form.intro}
              onChange={(e) => set("intro", e.target.value)}
              placeholder="Ej. Cultivo FEAR 5 en Arauca. Busco aliados bean-to-bar y aprender fermentación con criterio CoEx…"
            />
            <span className="text-[10px] text-colab-cream/35">{form.intro.trim().length}/40 mín.</span>
          </label>
        </section>
      )}

      {step === 3 && (
        <section>
          <p className="eyebrow text-colab-yellow">Producto o cacao</p>
          <h2 className="nodo-bio-title">
            La imagen que
            <br />
            <em>activa el deseo.</em>
          </h2>
          <p className="nodo-bio-lede">
            Mazorca, fermentación, tableta, cobertura o tu producto satisfactor: lo que quieres que vea la red.
          </p>
          <label className="nodo-bio-upload mt-6">
            <span>Imagen de cacao / producto</span>
            <input type="file" accept="image/*" onChange={(e) => void onFile("productDataUrl", e.target.files?.[0] ?? null)} />
            {form.productDataUrl ? (
              <Image src={form.productDataUrl} alt="Vista previa producto" width={280} height={180} className="nodo-bio-preview-wide" unoptimized />
            ) : (
              <em>Subir imagen →</em>
            )}
          </label>
          <Field
            label="Pie de foto (opcional)"
            value={form.productCaption}
            onChange={(v) => set("productCaption", v)}
            placeholder="FEAR 5 · 70% · cosecha 2026"
          />
        </section>
      )}

      {step === 4 && (
        <section>
          <p className="eyebrow text-colab-yellow">Contacto + publicar</p>
          <h2 className="nodo-bio-title">
            Activa tu
            <br />
            <em>enlace de nodo.</em>
          </h2>
          <p className="nodo-bio-lede">
            {form.kind ? NODE_KIND_LABEL[form.kind] : "Nodo"} · {form.orgName || "tu operación"}. Podrás enviar el link a cada
            aliado.
          </p>
          <div className="grid gap-4 mt-6">
            <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="hola@tunodo.com" />
            <Field label="WhatsApp" value={form.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="+57 300…" />
            <Field label="Instagram (opcional)" value={form.instagram} onChange={(v) => set("instagram", v)} placeholder="@tunodo" />
          </div>
          <div className="mt-6">
            <AuthConsentFields
              privacyAccepted={privacy}
              termsAccepted={terms}
              marketingOptIn={marketing}
              onPrivacyChange={setPrivacy}
              onTermsChange={setTerms}
              onMarketingChange={setMarketing}
              tone="dark"
            />
          </div>
        </section>
      )}

      {error && <p className="text-xs text-red-300 mt-4">{error}</p>}

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button type="button" className="nodo-bio-ghost" onClick={() => setStep((s) => s - 1)} disabled={pending}>
            ← Atrás
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            className="nodo-bio-primary flex-1"
            disabled={!canAdvance}
            onClick={() => canAdvance && setStep((s) => s + 1)}
          >
            Continuar →
          </button>
        ) : (
          <button type="button" className="nodo-bio-primary flex-1" disabled={!canAdvance || pending} onClick={submit}>
            {pending ? "Publicando…" : "Publicar bio de nodo →"}
          </button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="eyebrow text-colab-cream/45">{label}</span>
      <input
        type={type}
        className="nodo-bio-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
