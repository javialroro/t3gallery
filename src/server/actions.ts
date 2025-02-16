"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

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