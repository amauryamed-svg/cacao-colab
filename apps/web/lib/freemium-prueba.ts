export const freemiumAudiences = [
  {
    id: "secretaria",
    label: "Secretaría / territorio",
    lede: "Criterio de lote para llevar evidencia a tu territorio — sin fingir un programa oficial.",
    nextHref: "/aprende/cacaotier",
    nextLabel: "Abrir Master Cacaotier →",
  },
  {
    id: "cancilleria",
    label: "Cancillería / internacionalización",
    lede: "Narrativa Fine-Flavor de Colombia al mundo: origen, EUDR y cotización FOB honesta.",
    nextHref: "/export",
    nextLabel: "Abrir cotizador FOB →",
  },
  {
    id: "nodo",
    label: "Nodo / marca",
    lede: "Muestra oficio y conecta tu marca a la red sin ceder identidad.",
    nextHref: "/nodo",
    nextLabel: "Ver nodos →",
  },
  {
    id: "comprador",
    label: "Comprador / tostador",
    lede: "Prueba el criterio antes de pedir proforma: tipicidad, no sticker.",
    nextHref: "/export",
    nextLabel: "Cotizar FOB →",
  },
  {
    id: "amante",
    label: "Amante del cacao",
    lede: "Catar, aprender y pertenecer. El oficio se hereda practicándolo.",
    nextHref: "/aprende",
    nextLabel: "Entrar al campus →",
  },
] as const

export type FreemiumAudienceId = (typeof freemiumAudiences)[number]["id"]

export const freemiumQuestions = [
  {
    id: "q1",
    question: "¿Qué hace defendible un cacao colombiano frente a un comprador en UE, USA o Asia?",
    options: [
      {
        id: "a",
        text: "Pegar una medalla o un logo institucional en el empaque.",
        correct: false,
        explanation: "Una medalla o un escudo no sustituyen lote, genética y proceso. El Colab no inventa premios.",
      },
      {
        id: "b",
        text: "Línea de lote: origen, genética declarada, fermentación y secado comparables.",
        correct: true,
        explanation: "La tipicidad se defiende con evidencia de lote. Eso viaja de la finca al mundo.",
      },
      {
        id: "c",
        text: "Bajar el precio hasta ganar el cupo.",
        correct: false,
        explanation: "El Fine-Flavor no se internacionaliza solo por commodity. El oficio es la ventaja.",
      },
    ],
  },
  {
    id: "q2",
    question: "Un lote orgánico certificado ¿reemplaza la diligencia EUDR para entrar a Europa?",
    options: [
      {
        id: "a",
        text: "Sí: el sello orgánico basta para la UE.",
        correct: false,
        explanation: "Orgánico y libre de deforestación no son lo mismo. EUDR pide geolocalización y legalidad de parcela.",
      },
      {
        id: "b",
        text: "No: EUDR aplica igual; hay que geolocalizar y demostrar legalidad.",
        correct: true,
        explanation: "Correcto. El Colab enseña esa distinción en /conocimiento — sin fingir certificación propia.",
      },
      {
        id: "c",
        text: "Solo si la Cancillería emite una nota verbal.",
        correct: false,
        explanation: "La diplomacia abre puertas; no reemplaza el expediente de parcela.",
      },
    ],
  },
  {
    id: "q3",
    question: "Quien llega desde Secretaría o Cancillería, ¿qué encuentra abierto en el Colab?",
    options: [
      {
        id: "a",
        text: "Un programa oficial de esas entidades, con cupo reservado.",
        correct: false,
        explanation: "El Colab no es un programa oficial. Es casa abierta para quienes llegan desde ellas.",
      },
      {
        id: "b",
        text: "Pruebas freemium, campus Cacaotier y cotizador FOB — Colombia Fine-Flavor al mundo.",
        correct: true,
        explanation: "Landing pública, certificaciones en Semilla y FOB honesto. Luego el rango mide oficio, no cierra la puerta.",
      },
      {
        id: "c",
        text: "Solo WhatsApp y una vitrina de marcas.",
        correct: false,
        explanation: "Hay campus, evidencia y herramienta FOB. WhatsApp confirma lotes reales, no sustituye el Colab.",
      },
    ],
  },
] as const
