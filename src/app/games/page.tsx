"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMintToken } from "@thirdweb-dev/react";

import { useActiveAccount } from "thirdweb/react";
import { defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { client } from "@/clients/thirdweb";
// import { transfer } from "thirdweb/extensions/erc20";
// import { erc20Contract as contract } from "@/contracts/erc20";

export default function GamesPage() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [gameFinished, setGameFinished] = useState(true);
  const [topRandom, setTopRandom] = useState(250);
  const [leftRandom, setLeftRandom] = useState(150);
  const [finalScoreToClaim, setFinalScoreToClaim] = useState(0);
  const [gameScore, setGameScore] = useState(0);

  const { toast } = useToast();

  const activeAccount = useActiveAccount();

  const handleGamePlay = () => {
    if (!juegoIniciado) {
      setGameFinished(false);
      setJuegoIniciado(true);
      const interval = setInterval(() => {
        const randomTop = Math.floor(Math.random() * (482 - 127 + 1)) + 127;
        setTopRandom(randomTop);
        const randomLeft = Math.floor(Math.random() * (850 - 265 + 1)) + 265;
        setLeftRandom(randomLeft);
      }, 800);
      () => clearInterval(interval);
    } else {
      setJuegoIniciado(false);
      setGameFinished(true);
      setFinalScoreToClaim(gameScore);
      toast({
        title: "You have finished the game",
        description: `You have ${finalScoreToClaim} $PAKIs to claim`,
        action: (
          <ToastAction
            altText="Claim rewards now"
            onClick={handleClaimGameRewards}
          >
            Claim rewards now
          </ToastAction>
        ),
      });
      setGameScore(0);
    }
  };

  const handleScoreClick = () => {
    setGameScore((prev) => prev + 20);
  };

  const { mutate: mintToken } = useMintToken(token);


  const handleClaimGameRewards = async () => {
    alert("claim game rewards");
    console.log("qwee ", finalScoreToClaim);
    if (activeAccount) {
      console.log("asd ", { activeAccount });
      // attempt 1 via SDK server side
      // mintRewardsTo(finalScoreToClaim, activeAccount);

      // attempt 2 via transfer method from thirdweb/erc20
      // const tx = transfer({
      //   contract,
      //   to: activeAccount.address,
      //   amount: finalScoreToClaim || 20,
      // });
      // console.log({ tx });

      // attempt 3 via contract method call

      const contract = getContract({
        client,
        chain: defineChain(baseSepolia),
        address: process.env
          .NEXT_PUBLIC_PAKI_TOKEN_BASE_SEPOLIA_CONTRACT_ADDRESS as string,
      });

      await contract.
      
      .mintTo(toAddress, amount);
    }
  };

  return (
    <div className="flex flex-col h-full w-full  justify-center bg-gradient-to-r from-blue-300 to-blue-600">
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
          {!gameFinished ? (
            <Button type="button" size={"icon"}>
              <Image
                src={"/skinjuego.png"}
                alt="Skin Juego"
                width={50}
                height={50}
                onClick={handleScoreClick}
                style={{
                  top: topRandom,
                  left: leftRandom,
                }}
                className={`absolute block cursor-pointer hover:w-14 hover:h-14`}
              />
            </Button>
          ) : null}
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
