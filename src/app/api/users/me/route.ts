import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId: string = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select(
      "-password -isAdmin -__v"
    );
    return NextResponse.json({
      message: "User found",
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
