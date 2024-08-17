import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }, res: NextResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const url = `http://localhost:8080/api/admin/secure/add/book`;
    const body = await req.json();
    const requestOptions = {
      method: req.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    return await fetch(url, requestOptions);
  } catch (error: any) {
    console.error(error);
  }
}