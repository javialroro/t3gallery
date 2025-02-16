
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";
import { getImages, getMyImages } from "~/server/queries";
import Link from "next/link";
import ImageGrid from "./_components/imagegrid";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getImages(); 
  return <ImageGrid images={images} />;
}

export default async function HomePage() {

  

  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
} 
