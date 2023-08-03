import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { YourContextNameProvider } from "@/components/context-demo";
import { BranchConsumer } from "@/components/context-demo";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NextNProgress
        color="#4fa94d"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        timeout={3000}
      />
      <YourContextNameProvider>
        <BranchConsumer />
        <Component {...pageProps} />
      </YourContextNameProvider>
    </SessionProvider>
  );
}
