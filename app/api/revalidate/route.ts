import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret || request.headers.get("x-revalidation-secret") !== secret) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  revalidateTag("public-homepage", { expire: 0 });
  revalidateTag("public-homepage-universities", { expire: 0 });
  revalidateTag("public-testimonials", { expire: 0 });
  revalidateTag("public-scholarships", { expire: 0 });
  revalidateTag("public-homepage-events", { expire: 0 });

  return NextResponse.json({ success: true });
}
