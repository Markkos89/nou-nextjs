import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav>
      <div>
        <Button>{"<"}</Button>
        <Label>Pagina</Label>
        <Button>{">"}</Button>
      </div>
    </nav>
  );
}
