import {
  makeVerificationTemplate,
  sendEmail,
} from "@/features/services/sendEmail";
import { getServerSession } from "next-auth";

export async function GET(
  request: Request,

) {
  try {
    const session = await getServerSession();
    sendEmail(
      makeVerificationTemplate(session!.user.id),
      session!.user.email as string
    );

    return new Response("Ok");
  } catch (error: any) {
    return new Response("Error sending email", {
      status: 400,
      statusText: error?.message,
    });
  }
}
