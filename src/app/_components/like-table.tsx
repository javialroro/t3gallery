import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getImageLikes } from "~/server/actions";

export async function LikeTable({ imageId }: { imageId: number }) {
  const likes = await getImageLikes(imageId);
  return (
    <Table>
      <TableCaption>Your fans.</TableCaption>
      <TableHeader>
      </TableHeader>
      <TableBody>
        {likes.map((like) => (
          <TableRow key={like.imageUrl}>
            <TableCell>
              <img src={like.imageUrl} alt={like.fullName!} className="h-6 w-6 rounded-full" />
            </TableCell>
            <TableCell>{like.fullName}</TableCell>
          </TableRow>
        ))}
        
      </TableBody>
    </Table>
  );
}
