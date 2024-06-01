"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function BedroomPage() {
  const [lightsOn, setLightsOn] = useState(true);
  return (
    <div className={`bg-[#e9967a] h-full w-full  `}>
      <div className={`h-full w-full ${lightsOn ? "" : "bg-black opacity-50"}`}>
        <div className="flex flex-row w-full justify-center">
          <Image
            src={"/nouarmario.png"}
            width={150}
            height={300}
            alt="Nou armario"
            className="w-36 h-auto"
          />
          <Image
            src={"/noucama.png"}
            width={100}
            height={70}
            alt="Nou cama"
            className="w-52 h-36 mt-24 sm:w-80 sm:h-40"
          />
        </div>
        <div className="mt-20 sm:mt-6 flex flex-row w-full justify-center">
          <Image
            src={`/${lightsOn ? "skinbase" : "nou_dormido"}.png`}
            width={200}
            height={200}
            alt="Nou"
          />
        </div>
        <nav className="flex flex-row w-full justify-center mt-24">
          <div className="min-w-fit w-40 flex flex-row justify-between bg-black rounded-full p-4">
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => setLightsOn(!lightsOn)}
            >
              <Image
                src={`${lightsOn ? "/light_off.png" : "/light_on.png"}`}
                width={50}
                height={50}
                alt="Lights icon"
              />
            </Button>
            <Button size={"icon"} variant={"outline"}>
              <Image src={"/shop.png"} width={50} height={50} alt="Shop icon" />
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
