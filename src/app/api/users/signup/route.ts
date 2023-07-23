import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  const userTakenErrorMessage: string = "Cannot signup. User already exists.";
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: userTakenErrorMessage },
        { status: 400 }
      );
    }
    user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { error: userTakenErrorMessage },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
