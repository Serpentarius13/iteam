import {
  makeVerificationTemplate,
  sendEmail,
} from "@/features/services/sendEmail";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    await sendEmail(
      makeVerificationTemplate(session!.user.id),
      session.user.email as string
    );

   

    return new Response("Ok");
  } catch (error: any) {
    console.log(error);
    return new Response("Error sending email", {
      status: 400,
      statusText: error?.message,
    });
  }
}
