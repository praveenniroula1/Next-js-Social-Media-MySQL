// app/api/dashboard/route.tsx
import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request); // Ensure this function is correctly implemented
    const db = await connectDB();
    const query = `SELECT * FROM users WHERE id=?`;
    const [results]: any = await db.query(query, [id]);
    if (results.length === 0) {
      return NextResponse.json({
        status: "error",
        message: "No user found",
      });
    }
    const userDetails = results[0];
    return NextResponse.json({
      status: "success",
      message: "User Found",
      userDetails,
    });
  } catch (error) {
    console.error(error); // Ensure to log the error for debugging
    return NextResponse.json({
      status: "error",
      message: "An error occurred",
    });
  }
};
