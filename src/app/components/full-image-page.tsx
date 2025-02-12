import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { getMyImage } from "~/server/queries";
import { deleteMyImage } from "~/server/actions";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getMyImage(props.id);

  if (!image) {
    return <div>Error: Image not found</div>;
  }

  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

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
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created on:</span>
          <span>{image.createdAt.toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteMyImage(image.id);
            }}
          >
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
