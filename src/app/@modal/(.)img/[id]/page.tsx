import { getMyImage } from "~/server/queries";
import { Modal } from "../../modal";
import FullPageImageView from "~/app/components/full-image-page";


export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idAsNumber = parseInt((await params).id);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid id");
  }
  return (
      <Modal>
      <FullPageImageView id={idAsNumber} />
      </Modal>
  )
}