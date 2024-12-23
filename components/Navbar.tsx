import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "@/auth";
import BulbAnimation from "@/components/BulbAnimation";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-black shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-white flex">
          <BulbAnimation />
          <span className="text-3xl -ml-[6px] mt-1.5 font-work-sans font-semibold">
            nnovatia
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
              action={async () => {
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
