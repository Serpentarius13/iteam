import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma-db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });
    const cloudinary = require("cloudinary");
    const { file }: { file: File } = await request.json();

    if (!file) return new Response("No file was provided", { status: 422 });

    cloudinary.config({
      cloud_name: "dqlzlfysf",
      api_key: "877111718462765",
      api_secret: "g6-pQkcoMEbRvtuFppuuKznlmQ0",
    });

    const filename = file.name + session.user.email;
    await cloudinary.uploader.upload(file, {
      public_id: filename,
    });

    const url = cloudinary.url(filename, {
      width: 250,
      height: 250,
      Crop: "fill",
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: url },
    });

    return new Response("ok");
  } catch (error) {
    return new Response("There was an error uploading image", { status: 500 });
  }
}
