import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { getImage, getMyImage } from "~/server/queries";
import { deleteMyImage, hasUserLikedImage } from "~/server/actions";
import { SimpleLikeButton } from "../_components/simple-like-button";
import { LikeForm } from "../_components/like-form";
import { SheetTrigger } from "~/components/ui/sheet";
import { LikeSheet } from "../_components/like-sheet";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  if (!image) {
    return <div>Error: Image not found</div>;
  }

  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);
  const isLiked = await hasUserLikedImage(image.id);

  if (!uploaderInfo) {
    return <div>Error: Uploader not found</div>;
  }

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="flex-shrink object-contain"
        />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>

        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <div className="flex items-center">
            <span>{uploaderInfo.fullName}</span>
            <img
              src={uploaderInfo.imageUrl}
              alt={uploaderInfo.fullName!}
              className="ml-2 h-6 w-6 rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col p-2">
          <span>Created on:</span>
          <span>{image.createdAt.toLocaleDateString()}</span>
        </div>

        <div className="flex flex-row items-center gap-2 p-2">
          <form
            action={async () => {
              "use server";

              await deleteMyImage(image.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
          <SimpleLikeButton imageId={image.id} initialLiked={isLiked} />
        </div>
        <LikeSheet imageId={image.id}/>
      </div>
    </div>
  );
}
