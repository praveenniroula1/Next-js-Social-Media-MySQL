import { NextResponse } from "next/server";

export const GET = () => {
  try {
    const response = NextResponse.json({
      message: "Logged Out Successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), 
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed", success: false },
      { status: 500 }
    );
  }
};
