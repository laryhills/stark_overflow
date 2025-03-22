"use client";
import React, { useEffect } from "react";
import { mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  starkscan,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  // Check localStorage for previous connection state
  useEffect(() => {
    const storedConnection = localStorage.getItem("starknet-connected");
    if (storedConnection === "true") {
      // Trigger auto-connect logic
      console.log("Auto-connecting to the last used wallet...");
    }
  }, []);

  useEffect(() => {
    const handleConnection = (isConnected: boolean) => {
      localStorage.setItem("starknet-connected", isConnected ? "true" : "false");
    };

    const onConnect = () => handleConnection(true);
    const onDisconnect = () => handleConnection(false);

    window.addEventListener("starknet-connected", onConnect);
    window.addEventListener("starknet-disconnected", onDisconnect);

    return () => {
      window.removeEventListener("starknet-connected", onConnect);
      window.removeEventListener("starknet-disconnected", onDisconnect);
    };
  }, []);

  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={starkscan}
      autoConnect={true} // Enable auto-connect
    >
      {children}
    </StarknetConfig>
  );
}

export default StarknetProvider;