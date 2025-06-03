"use client";
import React from "react";
import { mainnet, sepolia, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  starkscan,
  publicProvider,
  jsonRpcProvider
} from "@starknet-react/core";




function rpc(chain: Chain) {
  return {
    nodeUrl: `https://starknet-${chain.network}.blastapi.io/0982a714-5c66-4d43-a2a5-5f5929deb867`
  }
}
const provider = jsonRpcProvider({
  rpc: rpc
});

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  return (
    <StarknetConfig
      chains={[mainnet,sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={starkscan}
      autoConnect={true} // Enable auto-connect
    >
      {children}
    </StarknetConfig>
  );
}

export default StarknetProvider;