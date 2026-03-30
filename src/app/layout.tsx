import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teq Print Informática | Impressão, Informática e Personalizados",
  description: "Teq Print Informática - 24 anos de experiência em impressão rápida, assistência técnica e produtos personalizados. Qualidade e confiança em Assis Chateaubriand - PR.",
  keywords: [
    "informática em Assis Chateaubriand",
    "impressão rápida",
    "assistência técnica",
    "personalizados",
    "manutenção de computadores",
    "manutenção de impressoras",
    "Teq Print",
    "canecas personalizadas",
    "xerox",
    "encadernação",
    "formatação de computador",
    "suporte técnico",
    "Assis Chateaubriand PR"
  ],
  authors: [{ name: "Teq Print Informática" }],
  icons: {
    icon: "/logo-teqprint .png",
    apple: "/logo-teqprint .png",
  },
  openGraph: {
    title: "Teq Print Informática | 24 Anos de Qualidade",
    description: "Referência em informática, especialista em impressos e expert em assistência técnica.",
    url: "https://teqprint.com.br",
    siteName: "Teq Print Informática",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/hero-bg.png",
        width: 1344,
        height: 768,
        alt: "Teq Print Informática - Soluções em tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teq Print Informática | Informática e Impressão",
    description: "24 anos de experiência em informática, impressão rápida e produtos personalizados em Assis Chateaubriand - PR.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
