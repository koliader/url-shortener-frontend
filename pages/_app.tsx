import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "../app/assets/styles/global.scss";
import NextNProgress from "nextjs-progressbar";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress
        color="#6f42c1"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
