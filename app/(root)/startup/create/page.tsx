import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartupForm from "@/components/StartupForm";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[330px]">
        <h1 className="heading">Submit your startup</h1>
      </section>

      <StartupForm />
    </>
  );
};
export default Page;
