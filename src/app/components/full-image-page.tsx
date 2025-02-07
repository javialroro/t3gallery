"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { getMyImage } from "~/server/queries";


export default async function FullPageImageView(props: { id: number }) {
    console.log("🔍 Props recibidas:", props);
  
    const image = await getMyImage(props.id);
    console.log("🖼 Imagen obtenida:", image);
  
    if (!image) {
      console.error("❌ No se encontró la imagen");
      return <div>Error: Image not found</div>;
    }
  
    const client = await clerkClient();
    const uploaderInfo = await client.users.getUser(image.userId);
    console.log("👤 Uploader info:", uploaderInfo);
  
    if (!uploaderInfo) {
      console.error("❌ No se encontró el usuario");
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
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  }
  