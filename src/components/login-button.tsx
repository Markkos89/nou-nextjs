"use client";

import { hasAccess } from "@/app/actions/gate-condition";
import { client } from "@/clients/thirdweb";
import { useRouter } from "next/navigation";
import { baseSepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  inAppWallet({
    auth: {
      options: ["google", "apple", "facebook"],
    },
  }),
];

export function LoginButton() {
  const router = useRouter();
  return (
    <ConnectButton
      autoConnect={true}
      chain={baseSepolia}
      client={client}
      wallets={wallets}
      theme={"dark"}
      connectModal={{
        size: "compact",
        welcomeScreen: {
          title: "Connect, Mint, Start playing!",
          subtitle: "NOUxBASE",
        },
      }}
      onConnect={async (wallet) => {
        const _hasNOU = await hasAccess(wallet.getAccount()?.address as string);
        if (_hasNOU) {
          router.push("/bedroom");
        } else {
          router.push("/");
        }
      }}
      onDisconnect={() => router.push("/")}
    />
  );
}
