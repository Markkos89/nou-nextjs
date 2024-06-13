"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  useAddress,
  useClaimToken,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";

export default function GamesPage() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [topRandom, setTopRandom] = useState(180);
  const [leftRandom, setLeftRandom] = useState(420);
  const [gameScore, setGameScore] = useState(0);
  const [finalScoreToClaim, setFinalScoreToClaim] = useState(0);

  const { toast } = useToast();

  const address = useAddress();

  const handleGamePlay = () => {
    if (!juegoIniciado) {
      setJuegoIniciado(true);
      const interval = setInterval(() => {
        const randomTop = Math.floor(Math.random() * (482 - 127 + 1)) + 127;
        setTopRandom(randomTop);
        const randomLeft = Math.floor(Math.random() * (850 - 265 + 1)) + 265;
        setLeftRandom(randomLeft);
      }, 800);
      () => clearInterval(interval);
    } else {
      setFinalScoreToClaim(gameScore);
      setJuegoIniciado(false);
      toast({
        title: "You have finished the game",
        description: `You have ${gameScore} $PAKIs to claim`,
      });
    }
  };

  const handleScoreClick = () => {
    setGameScore((prev) => prev + 20);
  };

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_PAKI_TOKEN_BASE_SEPOLIA_CONTRACT_ADDRESS as string
  );

  const { mutateAsync: claimToken, isLoading, error } = useClaimToken(contract);

  console.log({ isLoading, error });

  return (
    <div className="flex flex-col h-full w-full  justify-center bg-gradient-to-r from-blue-300 to-blue-700">
      <div className="flex w-full justify-center mt-4">
        {!juegoIniciado ? (
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={handleGamePlay}
            className="text-3xl"
          >
            Iniciar
          </Button>
        ) : (
          <Button
            variant={"secondary"}
            onClick={handleGamePlay}
            disabled={!juegoIniciado}
          >
            Finish game
          </Button>
        )}
      </div>
      <div className="flex w-full justify-center mt-4">
        <Label>Score: {gameScore}</Label>
      </div>
      <div className="flex grow justify-center items-center">
        <div
          className={`flex relative w-[50%] h-[50%] bg-black ${
            !juegoIniciado ? " justify-center items-center " : ""
          } rounded-3xl`}
        >
          {address && !juegoIniciado && finalScoreToClaim !== 0 ? (
            <div className="flex flex-row w-full">
              <Label>Rewards to claim</Label>
              <span>{finalScoreToClaim}</span>
              <Web3Button
                contractAddress={
                  process.env
                    .NEXT_PUBLIC_PAKI_TOKEN_BASE_SEPOLIA_CONTRACT_ADDRESS as string
                }
                action={(contract) => contract.erc20.claim(finalScoreToClaim)}
              >
                {`Claim ${finalScoreToClaim} $PAKI Tokens`}
              </Web3Button>
            </div>
          ) : (
            <Image
              src={"/skinjuego.png"}
              alt="Skin Juego"
              width={50}
              height={50}
              style={{
                top: topRandom,
                left: leftRandom,
              }}
              className={`absolute block cursor-pointer hover:w-14 hover:h-14`}
              onClick={handleScoreClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// click en cuadrado movedizo = +20 coins
// actualiza saldo, y lo guarda en localstorage

// click en iniciar hace esto:
// function Juego() {
//   let topRandom = Math.floor(Math.random() * (482 - 127 + 1)) + 127;
//   let leftRandom = Math.floor(Math.random() * (950 - 265 + 1)) + 265;
//   cuadradoJuego.style.opacity = 1;
//   cuadradoJuego.style.top = `${topRandom}px`;
//   cuadradoJuego.style.left = `${leftRandom}px`;
// }
// en un setInterval de 800ms, entonces el cuadrado se mueve
