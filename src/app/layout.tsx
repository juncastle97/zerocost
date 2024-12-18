"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

import Gnb from "@/components/commons/Gnb";
import Toast from "@/components/Page/Save/Toast";
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KHC7QML4');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        <title>제로코스트</title>
        <link rel="icon" href={`/images/favicon.ico`} />
        <Script
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
          strategy="beforeInteractive"
          defer
        />
        <link rel="manifest" href="/manifest.json" />
        {/* 기본 메타 정보 */}
        <meta name="title" content="제로코스트" />
        <meta
          name="description"
          content="제로코스트와 함께 쉽고 재밌게 소비의 가치를 지켜보세요!"
        />
        <meta name="theme-color" content="#ffc211" />
        <meta name="background-color" content="#ffffff" />
        {/* Open Graph 메타 태그 (소셜 미디어 최적화) */}
        <meta property="og:title" content="제로코스트" />
        <meta
          property="og:description"
          content="제로코스트와 함께 쉽고 재밌게 소비의 가치를 지켜보세요!"
        />
        <meta property="og:image" content="/images/ogImage.png" />
        <meta property="og:url" content="https://zerocost-eta.vercel.app/" />
        <meta property="og:type" content="website" />
        {/* Twitter 카드 메타 태그 (Twitter에서의 미리보기 최적화) */}
        <meta name="twitter:title" content="제로코스트" />
        <meta
          name="twitter:description"
          content="제로코스트와 함께 쉽고 재밌게 소비의 가치를 지켜보세요!"
        />
        <meta name="twitter:image" content="/images/ogImage.png" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* 애플 관련 메타 태그 */}
        <meta name="apple-mobile-web-app-title" content="제로코스트" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHC7QML4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
            <Toast />
          </div>
          <div id="portal-root"></div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
