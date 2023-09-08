import { } from 'react';
import '../../polyfills.ts';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
  hardhat,
  localhost,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";


export default function ({ children }) {
    // implement the wallet configuration here
    // your wagmiClient goes here, set the variable to client for easy identification
    const { chains, publicClient } = configureChains(
        [mainnet, polygon, polygonMumbai, localhost],
        [
          alchemyProvider({ apiKey: process.env.ALCHEMY_ID, stallTimeout: 1_000 }),
          publicProvider(),
        ]
      );
      
      const { connectors } = getDefaultWallets({
        appName: "GreenVestor",
        projectId: "f45a597df733b06e1d468f46dae825e1",
        chains,
      });
      
      const wagmiConfig  = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
      });
      

    return(
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
    ) 
};
