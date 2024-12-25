import React from 'react'
import {client} from "@/sanity/lib/client";
import {STARTUP_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import Link from "next/link";

const UserStartups = async ({id}: { id: string }) => {
    const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, {id});
    return (
        <>
            {startups.length > 0 ? startups.map((startup: StartupTypeCard) => (
                <StartupCard key={startup._id} post={startup}/>
            )) : (
                <div
                    className="col-span-2 w-full h-auto flex flex-col gap-5 items-center justify-center py-16 border border-gray-800 rounded-xl shadow-lg">

                    <div className="text-center">
                        <p className="text-xl font-bold font-work-sans text-red-600">It looks like you haven’t shared
                            any
                            startups
                            yet!</p>
                        <span className="text-base text-gray-500 mt-2">Start showcasing your amazing ideas to the
                            world.
                        </span>
                    </div>


                    <img src="/create-post.svg" alt="create-post-img"
                         className="w-full h-[250px] aspect-auto">

                    </img>

                    <Link
                        className="mt-4 px-6 py-3 bg-primary/80 text-white font-semibold rounded-3xl hover:bg-primary hover:shadow-xl shadow-md transition-all ease-in-out duration-300"
                        href="/startup/create"
                    >
                        Share a startup
                    </Link>
                </div>
            )}
        </>
    )
}
export default UserStartups
