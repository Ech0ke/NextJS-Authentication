import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/helpers/jwtActions";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email or password is not correct." },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword: boolean = await bcryptjs.compare(
      password,
      user.password
    );
    if (!validPassword) {
      return NextResponse.json(
        { error: "Email or password is not correct." },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const secret = new TextEncoder().encode(getJwtSecretKey());
    // create actual token (add extra claims, specify secret etc.)
    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(secret);
    // create response object
    const response = NextResponse.json({
      message: "Login succesfull",
      success: true,
    });

    // set token to the cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
