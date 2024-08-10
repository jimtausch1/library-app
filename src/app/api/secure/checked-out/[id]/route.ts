import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const headersList = cookies();
    const accessToken = headersList.get("appSession")?.value;
    // console.log(`accessToken is ${accessToken}`);
    const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser/?bookId=${params.id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    return await fetch(url, requestOptions);
  } catch (error: any) {
    console.error(error);
  }
}
