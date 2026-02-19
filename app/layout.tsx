import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VocalMax - 声音训练",
  description: "让声音更深沉、更稳定、更有掌控感。男性声音训练应用，每日短关卡，即时反馈。",
  keywords: ["声音训练", "男性声音", "深沉", "vocal training"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
