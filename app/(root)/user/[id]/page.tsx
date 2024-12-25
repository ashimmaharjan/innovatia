import React, { Suspense } from "react";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { StartUpCardSkeleton } from "@/components/StartupCard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <div className="rounded-full w-[220px] h-[220px] overflow-hidden border-[3px] border-black">
            <Image
              src={user.image}
              alt={user.name}
              width={220}
              height={220}
              className="profile_image"
            />
          </div>

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>

          <ul className="card_grid-sm">
            <Suspense fallback={<StartUpCardSkeleton />}>
              <UserStartups id={id}></UserStartups>
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};
export default Page;
