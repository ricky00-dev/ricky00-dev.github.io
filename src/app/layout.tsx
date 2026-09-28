import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
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
    <html lang="ko" className={`${geistMono.variable} antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">{children}</div>
        <footer className="mx-auto max-w-3xl px-5 py-12 text-sm text-faint sm:px-8">
          © 2026 조성빈
        </footer>
      </body>
    </html>
  );
}
