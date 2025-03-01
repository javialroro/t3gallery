import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import ratelimit from "~/server/ratelimit";
const f = createUploadthing();
const client = await clerkClient();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 40,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // Add debug logging
      const user = await auth();

      if (!user) {
        console.log("Auth failed - throwing unauthorized");
        throw new UploadThingError("Unauthorized");
      }

      const fullUserData = client.users.getUser(user.userId!);
      
      // if((await fullUserData)?.privateMetadata?.["can-upload"] !== "true") {
      //   throw new UploadThingError("User does not have permission to upload");
      // }
      

      const { success } = await ratelimit.limit(user.userId!);

      if (!success) {
        throw new UploadThingError("Rate limit exceeded");
      }

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      // Add type assertions or validation
      if (!file.name || !file.url || !metadata.userId) {
        throw new Error("Missing required file or user information");
      }

      // Now TypeScript knows these values are definitely strings
      await db.insert(images).values({
        name: file.name as string,
        url: file.url as string,
        userId: metadata.userId as string,
      });
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
