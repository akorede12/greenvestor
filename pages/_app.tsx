import type { AppProps } from "next/app";
import { ThirdwebProvider, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
// import "flowbite";
import "@rainbow-me/rainbowkit/styles.css";
import AppLayout from "../Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebSDKProvider activeChain="mumbai">
      <ThirdwebProvider activeChain={"mumbai"}>
        {/* Render the specified component with its page props */}

        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThirdwebProvider>
    </ThirdwebSDKProvider>
  );
}

export default MyApp;
