import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import {auth} from "@/auth";
import React from "react";

export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ query?: string }>;
}) {
    const query = (await searchParams).query;
    const params = {search: query || null};

    const session = await auth();

    console.log("Session created:", session?.id);

    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

    return (
        <>
            <section>
                <Hero/>
                <SearchForm query={query}/>
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>

                <div className="card_grid mt-7">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard key={post?._id} post={post}/>
                        ))
                    ) : (
                        <div
                            className="col-span-3 w-full h-auto flex flex-col gap-5 items-center justify-center py-16 border border-gray-800 rounded-xl shadow-lg">

                            <div className="text-center">
                                <p className="text-xl font-bold font-work-sans text-red-600">
                                    Ooops! No startups found.
                                </p>
                                <span className="text-base text-gray-500 mt-2">Try searching with different keywords or check back later.
                        </span>
                            </div>


                            <img src="/not-found.svg" alt="create-post-img"
                                 className="w-full h-[250px] aspect-auto">

                            </img>
                        </div>
                    )}
                </div>
            </section>

            <SanityLive/>
        </>
    );
}
