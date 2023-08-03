import React, { useContext } from "react";
import { YourContextName } from "@/components/context-demo";
import Link from "next/link";

export default function YourComponent() {
  const { branch } = useContext(YourContextName);

  return (
    <div>
      <Link href="./context-demo-page-two">Get to another-context-data</Link>
      <div>{branch} chosen</div>
    </div>
  );
}
