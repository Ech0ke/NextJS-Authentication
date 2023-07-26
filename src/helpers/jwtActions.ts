import { SignJWT, jwtVerify } from "jose";

type UserJwtPayload = {
  jti: string;
  iat: number;
};

export function getJwtSecretKey() {
  const secret = process.env.TOKEN_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable TOKEN_SECRET is not found");
  }
  return secret;
}

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Token expired");
  }
}
