import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { FloatingBubbles } from "@/components/ui/floating-bubbles";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-floating-button";

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
    "lavagem a seco",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lavexpress.com.br",
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
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uw5zbkhj8h");
          `}
        </Script>
      </body>
    </html>
  );
}
