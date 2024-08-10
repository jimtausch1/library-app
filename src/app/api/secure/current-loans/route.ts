import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const headersList = cookies();
    const accessToken = headersList.get("appSession")?.value;
    // console.log(`accessToken is ${accessToken}`);
    const url = `http://localhost:8080/api/books/secure/currentloans/count`;
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
