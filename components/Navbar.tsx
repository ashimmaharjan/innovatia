import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { VscLightbulbSparkle } from "react-icons/vsc";
import Lottie from "lottie-react";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="px-5 py-3 bg-black shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-white flex items-center">
          <VscLightbulbSparkle size={40} />
          <span className="ml-1 text-3xl uppercase font-work-sans font-semibold">
            Innovatia
          </span>
        </Link>

        <div className="flex items-center gap-5 text-gray-300 text-lg">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Sign Out</span>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Sign in</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
