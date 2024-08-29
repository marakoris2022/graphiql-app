import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { toastContainerConfig } from "@/utils/utils";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RSTeam REST & GraphiQL Client",
  description: "Application made for education purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          <div className="container">{children}</div>
        </main>
        <Footer />
        <ToastContainer {...toastContainerConfig} />
      </body>
    </html>
  );
}
