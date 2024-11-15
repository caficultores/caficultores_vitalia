import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { auth } from "@/auth";
import Web3AuthProvider from "./context/Web3AuthProvider";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Caficultores.co",
  description: "Connect, Taste, and Grow: The Global Coffee Community",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
  }>
) {
  const params = await props.params;
  if (!routing.locales.includes(params.lang as Locale)) {
    notFound();
  }

  const { children } = props;
  const messages = await getMessages();
  const session = await auth();

  setRequestLocale(params.lang);

  return (
    <html lang={params.lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <Web3AuthProvider>
              {children}
              <Toaster />
            </Web3AuthProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
