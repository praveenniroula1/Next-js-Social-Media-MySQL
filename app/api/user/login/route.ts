import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/app/DB-Config/dbCOnfig"

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    const db = await connectDB()
    const query = "select * from users where email=? and password=?"
    const [results]: any[] = await db.query(query, [email, password]);

    if (results.length === 0) {
      return NextResponse.json({
        status: "error",
        message: "User not found",
      });
    }

    const user = results[0]

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const token = await jwt.sign(tokenData, "secret1", { expiresIn: "1d" })


    const response = NextResponse.json({
      status: "success",
      message: "Yahhooo logged In successfully",
      user,
      token,
    });

    response.cookies.set("token", token, { httpOnly: true })

    return response


  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "User details failed to fetch",
      error: error,
    });
  }
}