import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "조성빈 · Backend Developer",
  description: "백엔드 개발자 조성빈의 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={geistMono.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-4xl px-5 sm:px-8">{children}</div>
        <footer className="mx-auto mt-10 max-w-4xl border-t border-line px-5 py-10 text-sm text-faint sm:px-8">
          © 2026 조성빈 · comicricky20@gmail.com
        </footer>
      </body>
    </html>
  );
}
