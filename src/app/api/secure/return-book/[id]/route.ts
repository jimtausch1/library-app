import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }, res: NextResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const url = `http://localhost:8080/api/books/secure/return?bookId=${params.id}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    return await fetch(url, requestOptions);
  } catch (error: any) {
    console.error(error);
  }
}
