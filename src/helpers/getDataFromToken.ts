import { NextRequest } from "next/server";
import { decodeJwt } from "jose";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken: string = request.cookies.get("token")?.value || "";
    const decodedToken = decodeJwt(encodedToken);

    return decodedToken.id as string;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
