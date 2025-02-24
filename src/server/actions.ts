"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { images, likes } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import { clerkClient } from "@clerk/nextjs/server";

export async function deleteMyImage(id: number) {
  try {
    const user = await auth();
    if (!user.userId) {
      throw new Error("Unauthorized");
    }

    await db
      .delete(images)
      .where(and(eq(images.id, id), eq(images.userId, user.userId)));

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "delete image",
      properties: {
        imageId: id,
      },
    });

    revalidatePath("/");

    // Redirigimos después de que todo esté completo
    redirect("/");
  } catch (error) {
    // Re-lanzamos el error para que el cliente lo maneje
    throw error;
  }
}

export async function hasUserLikedImage(imageId: number) {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }
  const result = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, user.userId), eq(likes.imageId, imageId)))
    .execute();
  return result.length > 0;
}

export async function toggleLike(imageId: number, shouldLike: boolean) {
  const user = await auth();
  if (!user || !user.userId) {
    throw new Error("Unauthorized");
  }

  if (shouldLike) {
    // Add like
    await db
      .insert(likes)
      .values({ userId: user.userId, imageId })
      .onConflictDoNothing();
  } else {
    // Remove like
    await db.delete(likes).where(eq(likes.imageId, imageId)).execute();
  }
}

export async function getImageLikes(
  imageId: number,
): Promise<{ fullName: string | null; imageUrl: string }[]> {
  const client = await clerkClient();

  // Fetch user IDs who liked the image
  const likesUsers = await db
    .select({ userId: likes.userId })
    .from(likes)
    .where(eq(likes.imageId, imageId))
    .execute();

  // Fetch user information for each user ID
  const userInfoPromises = likesUsers.map(async (like) => {
    const user = await client.users.getUser(like.userId);
    return {
      fullName: user.fullName,
      imageUrl: user.imageUrl,
    };
  });

  // Wait for all user info requests to complete
  const usersInfo = await Promise.all(userInfoPromises);

  return usersInfo;
}





