import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K2_Project | Corporate Portfolio",
  description: "K2_Projectの公式コーポレートサイト兼ポートフォリオです。公開中のアプリやサービスをご紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
