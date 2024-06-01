import { client } from "@/clients/thirdweb";
import { defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export const erc20Contract = getContract({
  client,
  chain: defineChain(baseSepolia),
  address: process.env
    .NEXT_PUBLIC_PAKI_TOKEN_BASE_SEPOLIA_CONTRACT_ADDRESS as string,
});
