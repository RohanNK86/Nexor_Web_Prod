import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const securePassword = process.env.ADMIN_SCANNER_PASSWORD;

    if (!securePassword) {
      return NextResponse.json({ success: false, error: "Admin system is not configured." }, { status: 500 });
    }

    if (password === securePassword) {
      // Set secure cookie for 12 hours
      cookies().set({
        name: "nexor_admin_token",
        value: "authenticated",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 12,
        sameSite: "lax",
      });

      return NextResponse.json({ success: true, redirectUrl: "/admin/scanner" });
    } else {
      return NextResponse.json({ success: false, error: "Access Denied: Incorrect Password." }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
