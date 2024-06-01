"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function GamesPage() {
  const router = useRouter();

  const handleInitGame = useCallback(() => {
    console.log("init game");
  }, []);

  return (
    <div className="flex flex-col h-full w-full  justify-center bg-gradient-to-r from-blue-300 to-blue-700">
      <div className="flex w-full justify-center mt-4">
        <Button onClick={() => router.back()}>Volver</Button>
      </div>
      <div className="flex grow justify-center items-center">
        <div className="flex w-[50%] h-[50%] bg-black justify-center items-center rounded-3xl">
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={handleInitGame}
            className="bg-blue-400 text-3xl"
          >
            Iniciar
          </Button>
        </div>
      </div>
    </div>
  );
}
