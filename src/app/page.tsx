"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  useContract,
  useContractMetadata,
  useClaimedNFTSupply,
  useConnectedWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const address = useAddress();
  // Replace the address with the address of the deployed contract
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_OPENEDITION_BASE_SEPOLIA_CONTRACT_ADDRESS as string
  );

  const { data: contractMetadata, isLoading: isContractMetadataLaoding } =
    useContractMetadata(contract);

  const {
    data: ownedNFTData,
    isLoading,
    error,
  } = useOwnedNFTs(contract, address);

  const { toast } = useToast();

  return (
    <div className="flex mt-10 items-center justify-center max-w-screen-lg mx-auto">
      <div className="text-center">
        <Label className="text-5xl">NOU x BASE</Label>
        <br />
        <Label className="text-lg">
          Mint your NOU for free and start playing :)
        </Label>
        <div className="flex flex-col items-center ">
          {isContractMetadataLaoding ? (
            <p>Loading...</p>
          ) : (
            <>
              <MediaRenderer
                src={contractMetadata?.image}
                className="rounded-xl"
              />
              <h2 className="text-2xl font-semibold mt-4">
                {contractMetadata?.name}
              </h2>
              <p className="text-lg mt-2">{contractMetadata?.description}</p>
            </>
          )}
          {ownedNFTData?.length ? (
            <Link href="/bedroom">
              <Button
                size={"lg"}
                variant={"default"}
                type="button"
                className="text-xl"
              >
                Enter game
              </Button>
            </Link>
          ) : (
            <Web3Button
              contractAddress={
                process.env
                  .NEXT_PUBLIC_OPENEDITION_BASE_SEPOLIA_CONTRACT_ADDRESS as string
              }
              action={(contract) => contract.erc721.claim(1)}
              onSuccess={(result) => {
                toast({
                  title: "NOU NFT Claimed!",
                  description:
                    "Now start playing, feed your Nou! Make him rest! Create potions, gain XP and take care of NOU's HP.",
                });
                router.push("/bedroom");
              }}
              onError={(error) => {
                toast({
                  variant: "destructive",
                  title: "Error claiming NOU",
                  description: `Something happened with your request. ${error.message} `,
                });
              }}
            >
              Claim NOU NFT FREE
            </Web3Button>
          )}
        </div>
      </div>
    </div>
  );
}
