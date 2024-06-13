"use client";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

type Props = {
  children: React.ReactNode;
};

export function AppWithProviders({ children }: Props) {
  return (
    <ThirdwebProvider
      activeChain="base-sepolia-testnet"
      autoConnect={true}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
      ]}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string}
    >
      {children}
    </ThirdwebProvider>
  );
}
