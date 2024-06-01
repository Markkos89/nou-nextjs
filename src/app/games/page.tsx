"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";

export default function GamesPage() {
  const router = useRouter();
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [topRandom, setTopRandom] = useState(250);
  const [leftRandom, setLeftRandom] = useState(150);

  const [gameScore, setGameScore] = useState(0);

  const handleInitGame = useCallback(() => {
    setJuegoIniciado(true);
    const interval = setInterval(() => {
      const randomTop = Math.floor(Math.random() * (482 - 127 + 1)) + 127;
      setTopRandom(randomTop);
      const randomLeft = Math.floor(Math.random() * (950 - 265 + 1)) + 265;
      setLeftRandom(randomLeft);
    }, 600);
    () => clearInterval(interval);
  }, []);

  const handleScoreClick = () => {
    setGameScore((prev) => prev + 20);
  };

  return (
    <div className="flex flex-col h-full w-full  justify-center bg-gradient-to-r from-blue-300 to-blue-700">
      <div className="flex w-full justify-center mt-4">
        <Button onClick={() => router.back()}>Volver</Button>
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
          {!juegoIniciado ? (
            <Button
              variant={"secondary"}
              size={"lg"}
              onClick={handleInitGame}
              className="bg-blue-400 text-3xl"
            >
              Iniciar
            </Button>
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
              className={`absolute cursor-pointer hover:w-14 hover:h-14`}
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
