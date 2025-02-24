import { hasUserLikedImage } from "~/server/actions";
import { SimpleLikeButton } from "./simple-like-button";

export async function LikeForm({ imageId }: { imageId: number }) {
  const isLiked = await hasUserLikedImage(imageId);

  return <SimpleLikeButton imageId={imageId} initialLiked={isLiked} />;
}
