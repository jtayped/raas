import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import RootProviders from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RaaS | Enterprise-Grade Decimal Management",
  description:
    "Stop leaving your integers to chance. RaaS provides secure, blazingly fast, cloud-native number rounding for modern engineering teams.",
  keywords: [
    "RaaS",
    "Rounding as a Service",
    "Math API",
    "Enterprise Decimals",
    "Math.round",
    "Math.floor",
    "Math.ceil",
    "SaaS",
    "Cloud-native math",
  ],
  authors: [{ name: "Joel Taylor" }],
  metadataBase: new URL("https://raas.joeltaylor.business"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "RaaS | Enterprise Decimal Management",
    description:
      "Because paying $99/mo to round numbers builds character. Secure, SOC-2 compliant decimal truncation.",
    siteName: "RaaS",
  },
  twitter: {
    card: "summary_large_image",
    title: "RaaS | Enterprise Decimal Management",
    description:
      "Stop leaving your integers to chance. Upgrade to Pro to unlock rounding up.",
    creator: "@jtayped_",
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
