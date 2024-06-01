import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { balanceOf as balanceOfERC721 } from "thirdweb/extensions/erc721";
import { balanceOf as balanceOfERC20 } from "thirdweb/extensions/erc20";
import { client } from "@/clients/thirdweb";

export async function hasAccess(address: string): Promise<boolean> {
  return await hasAtLeastOneNouNFTClaimed(address);
}

async function hasAtLeastOneNouNFTClaimed(address: string) {
  const requiredQuantity = 1n;

  const erc721Contract = getContract({
    // replace with your own NFT contract address
    address: process.env
      .NEXT_PUBLIC_OPENEDITION_BASE_SEPOLIA_CONTRACT_ADDRESS as string,

    // replace with the chain that your nft contract was deployed on
    // if that chain isn't included in our default list, use `defineChain`
    chain: baseSepolia,
    client,
  });

  const ownedBalance = await balanceOfERC721({
    contract: erc721Contract,
    owner: address,
  });

  console.log({ ownedBalance });

  return ownedBalance >= requiredQuantity;
}

async function example_hasSomeErc20Tokens(address: string) {
  const requiredQuantity = 10n; // 10 erc20 token

  const erc20Contract = getContract({
    // replace with your own erc20 contract address
    address,
    client,
    // replace with the chain that your erc20 contract was deployed on
    // if that chain isn't included in our default list, use `defineChain`
    chain: baseSepolia,
  });

  const ownedBalance = await balanceOfERC20({
    contract: erc20Contract,
    address,
  });

  console.log({ ownedBalance });

  return ownedBalance >= requiredQuantity;
}
