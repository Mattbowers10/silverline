import type { Metadata } from "next";
import { caudex, inter } from "@/lib/fonts";
import "../(site)/globals.css";

export const metadata: Metadata = {
  title: "Silverline · Dashboard",
  description: "Silverline operations dashboard.",
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caudex.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-page)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
