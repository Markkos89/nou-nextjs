"use client";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { usePathname, useRouter } from "next/navigation";
import { LoginButton } from "./login-button";

type Props = {};

export default function Navbar({}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const pageName =
    pathname === "/bedroom"
      ? "Dormitorio"
      : pathname === "/kitchen"
      ? "Cocina"
      : pathname === "/lab"
      ? "Laboratorio"
      : pathname === "/games"
      ? "Cuarto de Juegos"
      : "";

  const handleButtonBack = () => {
    const previousPage =
      pathname === "/bedroom"
        ? "/games"
        : pathname === "/kitchen"
        ? "/bedroom"
        : pathname === "/lab"
        ? "/kitchen"
        : pathname === "/games"
        ? "/lab"
        : "";

    router.push(previousPage);
  };

  const handleButtonForward = () => {
    const nextPage =
      pathname === "/bedroom"
        ? "/kitchen"
        : pathname === "/kitchen"
        ? "/lab"
        : pathname === "/lab"
        ? "/games"
        : pathname === "/games"
        ? "/bedroom"
        : "";

    router.push(nextPage);
  };

  return (
    <>
      <nav className={`flex w-full justify-center`}>
        <div className="flex w-full justify-center">
          <div
            className={`flex flex-row min-w-48 justify-between items-center  ${
              pathname === "/" ? "hidden" : ""
            }`}
          >
            <Button onClick={handleButtonBack}>{"<"}</Button>
            <Label>{pageName}</Label>
            <Button onClick={handleButtonForward}>{">"}</Button>
          </div>
        </div>
        <LoginButton />
      </nav>
    </>
  );
}
