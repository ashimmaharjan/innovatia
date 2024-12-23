import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import {auth} from "@/auth";

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
                        <p className="no-results">No startups found</p>
                    )}
                </div>
            </section>

            <SanityLive/>
        </>
    );
}
