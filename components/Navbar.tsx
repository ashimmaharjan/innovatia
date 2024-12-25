import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "@/auth";
import BulbAnimation from "@/components/BulbAnimation";
import { BadgePlus, Github, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

        <div className="flex items-center gap-4 md:gap-5 text-gray-300 text-lg">
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="hover:text-[#ff9167] transition-all duration-300 ease-in-out"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-8 sm:hidden text-gray-300" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="hover:text-[#ff9167] transition-all duration-300 ease-in-out"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-7 mt-2 sm:hidden text-red-600" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10 border border-white">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1 border px-2.5 py-1.5 border-white hover:bg-white hover:text-gray-800 transition-all duration-300 ease-in-out"
              >
                <Github className="size-5" />
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
