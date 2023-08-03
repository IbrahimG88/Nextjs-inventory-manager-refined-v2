import * as React from "react";

import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  // Your code to update app data goes here
  // server.js or index.js

  return { props: { session } };
}

export default function Home() {
  const { data: session } = useSession();
  //console.log("session", session);
  // console.log("session.user.role", session.user.role);

  return (
    <div>
      "Hello World!"
      <br />
      {session &&
      (session.user.role === "super-user" || session.user.role === "admin") ? (
        <p>user is admin</p>
      ) : (
        <p> user</p>
      )}
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
