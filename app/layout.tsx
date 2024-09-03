import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { toastContainerConfig } from "@/utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RSTeam REST & GraphiQL Client",
  description: "Application made for education purpose.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            <div className="container">{children}</div>
          </main>
          <Footer />
          <ToastContainer {...toastContainerConfig} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
