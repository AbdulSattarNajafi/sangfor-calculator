import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const secretKey = process.env.CAPTCHA_SECRET_KEY;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    },
  );

  const data = await response.json();
  return Response.json({ success: data.success, score: data.score });
}
