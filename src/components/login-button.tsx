import { client } from "@/clients/thirdweb";
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
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={"light"}
      connectModal={{
        size: "compact",
        welcomeScreen: {
          title: "Connect, Mint, Start playing!",
          subtitle: "NOUxBASE",
        },
      }}
    />
  );
}
