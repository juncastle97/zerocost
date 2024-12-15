"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

import Gnb from "@/components/commons/Gnb";
import "@/styles/base/index.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isBadgePage = pathname?.startsWith("/mypage/badge");

  return (
    <html lang="en">
      <head>
        <title>샀다치고 가계부!</title>
        <link rel="icon" href={`/icons/ic-logo.svg`} />
        <Script
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
          strategy="beforeInteractive"
          defer
        />
        <link rel="manifest" href="/manifest.json" />
        {/* 기본 메타 정보 */}
        <meta name="title" content="샀다치고 가계부!" />
        <meta name="description" content="샀다치고 가계부!" />
        <meta name="theme-color" content="#ffc211" />
        <meta name="background-color" content="#ffffff" />
        {/* Open Graph 메타 태그 (소셜 미디어 최적화) */}
        <meta property="og:title" content="샀다치고 가계부!" />
        <meta property="og:description" content="샀다치고 가계부!" />
        <meta property="og:image" content="/icons/ic-logo.svg" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
        {/* Twitter 카드 메타 태그 (Twitter에서의 미리보기 최적화) */}
        <meta name="twitter:title" content="샀다치고 가계부!" />
        <meta name="twitter:description" content="샀다치고 가계부!" />
        <meta name="twitter:image" content="/icons/ic-logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* 애플 관련 메타 태그 */}
        <meta name="apple-mobile-web-app-title" content="샀다치고 가계부!" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/icons/ic-logo.svg" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div
            style={{
              width: "100%",
              maxWidth: isAdminPage ? "none" : "39rem",
              height: "100vh",
              backgroundColor: isAdminPage ? "white" : "black",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <Script
              src="https://developers.kakao.com/sdk/js/kakao.js"
              strategy="beforeInteractive"
              onLoad={() => {
                if (typeof window !== "undefined" && window.Kakao) {
                  if (!window.Kakao.isInitialized()) {
                    window.Kakao.init("c99ee35d6b865e87ea702e6d6530e391");
                    console.log("Kakao SDK 초기화 완료");
                  }
                }
              }}
            />
            {!isAdminPage && !isBadgePage && <Gnb />}
            {children}
          </div>
          <div id="portal-root"></div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
