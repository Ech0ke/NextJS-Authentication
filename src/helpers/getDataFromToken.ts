import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken: string = request.cookies.get("token")?.value || "";

    const decodedToken: string | JwtPayload = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );

    // check if token is valid and data can be extracted from payload
    if (typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }
    return decodedToken.id;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
