import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REST Client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
