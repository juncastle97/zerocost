"use client";
import "@/styles/base/index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import Gnb from "@/components/Gnb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Query Client는 컴포넌트가 다시 렌더링될 때마다 새로 생성되지 않도록 useState로 관리
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div
            style={{
              width: "100%",
              maxWidth: "60rem",
              height: "100vh",
              backgroundColor: "black",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <Gnb />
            {children}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
