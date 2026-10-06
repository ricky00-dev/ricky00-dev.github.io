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
      <body id="top" className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
        <footer className="mt-20 border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-faint sm:px-8">
            <span>조성빈 · Backend Developer</span>
            <span className="flex gap-4">
              <a href="https://github.com/ricky00-dev" className="hover:text-fg">
                GitHub ↗
              </a>
              <a href="#top" className="hover:text-fg">
                맨 위로 ↑
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
