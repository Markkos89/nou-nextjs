"use client";

import {
  MediaRenderer,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { defineChain, getContract, toEther } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  claimTo,
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";
import { client } from "@/clients/thirdweb";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const account = useActiveAccount();

  const router = useRouter();
  // Replace the chain with the chain you want to connect to
  const chain = defineChain(baseSepolia);

  // Replace the address with the address of the deployed contract
  const contract = getContract({
    client: client,
    chain: chain,
    address: process.env
      .NEXT_PUBLIC_OPENEDITION_BASE_SEPOLIA_CONTRACT_ADDRESS as string,
  });

  const { data: contractMetadata, isLoading: isContractMetadataLaoding } =
    useReadContract(getContractMetadata, { contract: contract });

  const { data: claimedSupply, isLoading: isClaimedSupplyLoading } =
    useReadContract(getTotalClaimedSupply, { contract: contract });

  const { data: totalNFTSupply, isLoading: isTotalSupplyLoading } =
    useReadContract(nextTokenIdToMint, { contract: contract });

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract: contract,
  });

  const getPrice = (quantity: number) => {
    const total =
      quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };

  const { toast } = useToast();

  return (
    <main className="p-4  min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 text-center">
        <div className="flex flex-col items-center mt-4">
          {isContractMetadataLaoding ? (
            <p>Loading...</p>
          ) : (
            <>
              <MediaRenderer
                client={client}
                src={contractMetadata?.image}
                className="rounded-xl"
              />
              <h2 className="text-2xl font-semibold mt-4">
                {contractMetadata?.name}
              </h2>
              <p className="text-lg mt-2">{contractMetadata?.description}</p>
            </>
          )}
          {isClaimedSupplyLoading || isTotalSupplyLoading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-lg mt-2 font-bold">
              Total NFT Supply: {claimedSupply?.toString()}/
              {totalNFTSupply?.toString()}
            </p>
          )}

          <TransactionButton
            transaction={() =>
              claimTo({
                contract: contract,
                to: account?.address || "",
                quantity: BigInt(1),
              })
            }
            onTransactionConfirmed={async () => {
              toast({
                title: "NOU NFT Claimed!",
                description:
                  "Now start playing, feed your Nou! Make him rest! Create potions, gain XP and take care of NOU's HP.",
              });
              router.push("/bedroom");
            }}
          >
            {`Claim NFT (${getPrice(1)} ETH)`}
          </TransactionButton>
        </div>
      </div>
    </main>
  );
}
