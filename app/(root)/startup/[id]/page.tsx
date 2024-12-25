import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className={"pink_container !min-h-[430px]"}>
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto object-center object-cover rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/users/${post.author?.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <div className="rounded-full drop-shadow-lg w-[64px] h-[64px] overflow-hidden">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  quality={100}
                />
              </div>

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-20-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided.</p>
          )}
        </div>

        <hr className="divider" />

        {/*  TODO: EDITOR SELECTED STARTUPS*/}
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold"> Editor Picks </p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view-skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};
export default Page;
