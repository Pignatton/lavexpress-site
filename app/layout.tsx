import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { FloatingBubbles } from "@/components/ui/floating-bubbles";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-floating-button";
import { AttributionBoot } from "@/components/attribution-boot";
import { SITE_URL } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  // Resolve URLs relativas de OG/canonical. Sem isto o Next nao consegue
  // montar URLs absolutas e o Google recebe metadados incompletos.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lavexpress | Lavanderia Delivery em Vitória e Vila Velha",
    template: "%s | Lavexpress",
  },
  description:
    "Sua lavanderia delivery premium em Vitória e Vila Velha. Coleta e entrega em Jardim Camburi, Praia do Canto, Praia da Costa e região. Agende agora.",
  keywords: [
    "lavanderia",
    "lavanderia delivery",
    "lavanderia vitória es",
    "lavanderia vila velha",
    "lavar edredom",
    "passadoria",
    // "lavagem a seco" saiu daqui de proposito: a operacao nao executa dry
    // cleaning. Anunciar o termo atrai busca que o atendimento nao atende — e a
    // campanha do Google Ads ja bloqueia essas consultas como negativas.
    "lavanderia de ternos",
    "lavagem de couro",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    title: "Lavexpress | Lavanderia Delivery Premium",
    description:
      "Lavanderia com coleta e entrega em Vitória e Vila Velha. Cuidado profissional para suas roupas.",
    siteName: "Lavexpress",
  },
  icons: {
    icon: "/imagens/favcon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M3CKT8W4');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-sans relative`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3CKT8W4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AttributionBoot />
        <FloatingBubbles />
        <div className="relative z-10">
          {children}
          <WhatsAppFloatingButton />
        </div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WJH5E451M7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WJH5E451M7');
          `}
        </Script>
        {/*
          * Microsoft Clarity (uw5zbkhj8h) — DESABILITADO em 29/10/2026.
          *
          * POR QUE: o Clarity estava transmitindo o identificador interno
          * LX-XXXXXX para a Microsoft. Medido em producao, interceptando o
          * upload e descomprimindo o payload:
          *
          *   {"e":[...,"uw5zbkhj8h",...],
          *    "a":[[...,"Agendar minha coleta",
          *          "https://wa.me/55...?text=...%0A%0ARef%3A+LX-M1VX21"...
          *
          * O caminho e o handler de clique de components/whatsapp-link.tsx,
          * que reescreve o href do no vivo do DOM. O Clarity grava mutacoes de
          * DOM, e o href entra no fluxo de ATRIBUTOS da ancora — que o masking
          * de texto do Clarity nao alcanca. Nao ha nenhum data-clarity-mask na
          * base de codigo.
          *
          * O LX- e exatamente a chave que liga uma conversa de WhatsApp a uma
          * visita ao site. Ele estava saindo para fornecedor estrangeiro, num
          * gravador de sessao que roda sem consentimento.
          *
          * PARA REATIVAR, tres coisas precisam ser verdade ao mesmo tempo:
          *   1. mascarar o href das ancoras de WhatsApp (data-clarity-mask)
          *      ou parar de escrever o Ref: dentro do href;
          *   2. REFAZER o teste do payload DESCOMPRIMIDO e comprovar que o
          *      LX- nao aparece — masking Strict no painel NAO basta, e nao
          *      vale confiar na configuracao sem medir;
          *   3. base legal e informacao ao titular resolvidas.
          *
          * GTM, GA4 e as conversoes do Google Ads continuam ligados.
          */}
      </body>
    </html>
  );
}
