import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request);
    const db = await connectDB();
    const query = `select * from users where id=?`;
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
    console.log(error);
  }
};
