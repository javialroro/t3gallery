import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { likes } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const user = await auth();

  // Verifica si el usuario está autenticado y tiene un userId válido
  if (!user || !user.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageId, liked } = await req.json();

  if (liked) {
    try {
      await db
        .insert(likes)
        .values({ userId: user.userId as string, imageId })
        .execute();
    } catch (error) {
      console.error("Error inserting like:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else {
    try {
      await db
        .delete(likes)
        .where(and(eq(likes.userId, user.userId), eq(likes.imageId, imageId)))
        .execute();
    } catch (error) {
      console.error("Error deleting like:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  // Revalidar el path después de la acción
  const pathToRevalidate = `/img/${imageId}`; // Cambia esto según la ruta que necesites revalidar
  revalidatePath(pathToRevalidate);

  return NextResponse.json({ success: true });
}
