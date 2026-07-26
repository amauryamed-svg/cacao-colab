export const metadata = {
  title: "Cacao Colab API",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "monospace", padding: 24 }}>{children}</body>
    </html>
  );
}
