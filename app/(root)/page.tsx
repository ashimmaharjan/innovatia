"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/HeroHighlight";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const [query, setQuery] = useState<string>("");

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Ashim" },
      _id: 1,
      description: "Exploring the rise of robots.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: new Date(),
      views: 120,
      author: { _id: 2, name: "Bella" },
      _id: 2,
      description: "AI and its impact on technology.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Technology",
      title: "The Future of AI",
    },
    {
      _createdAt: new Date(),
      views: 78,
      author: { _id: 3, name: "Charlie" },
      _id: 3,
      description: "How robots and AI are changing industries.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "AI",
      title: "AI and Robotics Collaboration",
    },
    {
      _createdAt: new Date(),
      views: 90,
      author: { _id: 4, name: "Diana" },
      _id: 4,
      description: "The role of robotics in modern healthcare.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Science",
      title: "Robotics in Medicine",
    },
    {
      _createdAt: new Date(),
      views: 102,
      author: { _id: 5, name: "Ethan" },
      _id: 5,
      description: "Innovative robotic designs shaping the world.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Innovation",
      title: "Innovative Robotics of 2024",
    },
    {
      _createdAt: new Date(),
      views: 67,
      author: { _id: 6, name: "Fiona" },
      _id: 6,
      description: "Robots and automation in factories.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Automation",
      title: "Automation with Robots",
    },
    {
      _createdAt: new Date(),
      views: 130,
      author: { _id: 7, name: "George" },
      _id: 7,
      description: "Advancements in robotic engineering.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Robotics",
      title: "Engineering the Future with Robots",
    },
    {
      _createdAt: new Date(),
      views: 98,
      author: { _id: 8, name: "Hannah" },
      _id: 8,
      description: "Humanoid robots and their capabilities.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "Technology",
      title: "Humanoid Robots in Action",
    },
    {
      _createdAt: new Date(),
      views: 85,
      author: { _id: 9, name: "Ivan" },
      _id: 9,
      description: "AI is powering robots across sectors.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3D",
      category: "AI",
      title: "AI Powering Robotics",
    },
    {
      _createdAt: new Date(),
      views: 150,
      author: { _id: 10, name: "Julia" },
      _id: 10,
      description: "The potential role of robots in our future.",
      image:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3R8ZW58MHx8MHx8fDA%3De",
      category: "Future",
      title: "Robots and the Future Ahead",
    },
  ];

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

        <div className="card_grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </div>
      </section>
    </>
  );
}
