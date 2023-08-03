import * as React from "react";

import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { signIn } from "next-auth/react";

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

  if (
    session &&
    (session.user.role === "super-user" || session.user.role === "admin")
  ) {
    return (
      <div>
        "Hello World!"
        <br />
        {session &&
        (session.user.role === "super-user" ||
          session.user.role === "admin") ? (
          <p>
            user is admin and this special element is individually protected
          </p>
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="text-lg font-bold mb-4">Not authorized</div>
      <h2 className="text-lg font-bold mb-4">Please login to continue</h2>
      <button
        onClick={() => signIn()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </div>
  );
}
