
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages(); 
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
    {images.map((image) => (
        <div key={image.id} className="flex w-48 h-48 flex-col">
          <Link href={`/img/${image.id}`} >
          <Image 
          src={image.url} 
          alt={image.name} 
          width = {480}
          height = {480}
          style={{objectFit: "contain"}} 
          />
          </Link>      
          <div className="text-center">{image.name}</div>
        </div>
      ))
    }
    </div>
  );
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
