"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/HeroHighlight";
import SearchForm from "../../components/SearchForm";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchQuery = async () => {
      const params = await searchParams;
      setQuery(params?.query || "");
    };

    fetchQuery();
  }, [searchParams]);

  return (
    <>
      <section>
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl font-work-sans px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto uppercase"
          >
            Pitch your Startup, <br />
            Connect With Entrepreneurs
            <br />
            <Highlight className="text-white">
              Submit, Vote, and Get Noticed.
            </Highlight>
          </motion.h1>

          <SearchForm query={query} />
        </HeroHighlight>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="card_grid mt-7"></ul>
      </section>
    </>
  );
}
