import { client } from "@/clients/thirdweb";
import { defineChain, getContract, sendAndConfirmTransaction } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { mintTo } from "thirdweb/extensions/erc20";
import { Account } from "thirdweb/wallets";

export async function mintRewardsTo(rewards: number, activeAccount: Account) {
  const contract = getContract({
    client,
    chain: defineChain(baseSepolia),
    address: process.env
      .NEXT_PUBLIC_PAKI_TOKEN_BASE_SEPOLIA_CONTRACT_ADDRESS as string,
  });

  const tx = await mintTo({
    contract,
    to: activeAccount.address,
    amount: rewards,
  });

  const receipt = await sendAndConfirmTransaction({
    transaction: tx,
    account: activeAccount,
  });

  console.log({ receipt });
}
