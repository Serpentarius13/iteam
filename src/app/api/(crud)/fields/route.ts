import { getAllFields } from "@/features/services/db/fields";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fields = await getAllFields()
    return NextResponse.json(fields)
  } catch (error) {
    console.error(error)
    return new Response("Error loading fields", { status: 400 });
  }
}
