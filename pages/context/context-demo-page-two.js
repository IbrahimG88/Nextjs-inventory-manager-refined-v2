import React, { useContext } from "react";
import { YourContextName } from "@/components/context-demo";

export default function SecondComponent() {
  const { branch } = useContext(YourContextName);

  return (
    <div>
      <h1>Hello context 2 world</h1>
      <div>{branch}</div>
    </div>
  );
}
