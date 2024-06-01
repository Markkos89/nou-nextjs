"use client";

import React, { useEffect, useState } from "react";
import { getBalance } from "thirdweb/extensions/erc20";
import { erc20Contract as contract } from "@/contracts/erc20";
import { useActiveAccount } from "thirdweb/react";
import { toTokens } from "thirdweb/utils";

export function PakiBalance() {
  const activeAccount = useActiveAccount();

  const [displayVal, setDisplayVal] = useState("");

  useEffect(() => {
    const getPakiBalance = async () => {
      const balance = await getBalance({
        contract,
        address: activeAccount?.address as string,
      });
      setDisplayVal(toTokens(balance.value, 0));
    };
    if (activeAccount?.address) {
      getPakiBalance();
    }
  }, [activeAccount]);

  return (
    <div className="p-1 w-fit bg-gray-900 text-center rounded-3xl text-white">
      <p className="tracking-wide">
        <span className="text-gray-400 align-top">$PAKI </span>
        <span className="text-xl font-semibold">{displayVal}</span>
      </p>
    </div>
  );
}
