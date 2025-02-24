import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { LikeTable } from "./like-table";

export function LikeSheet({ imageId }: { imageId: number }) {
  return (
    <Sheet >
      <SheetTrigger>View Likes</SheetTrigger>
      <SheetContent className="z-[1001]" side={"left"}>
        <SheetHeader>
          <SheetTitle>Liked By:</SheetTitle>
          <LikeTable imageId={imageId}/>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
