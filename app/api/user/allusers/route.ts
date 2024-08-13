import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const id = await getDataFromToken(request);
        const db = await connectDB();
        const userQuery = `select * from users where id=?`;
        const [userResults]: any = await db.query(userQuery, [id]);
        if (userResults.length === 0) {
            return NextResponse.json({
                status: "error",
                message: "No user found",
            });
        }
        const userDetails = userResults[0];
        const query = "SELECT * FROM users";
        const [results] = await db.query(query);

        return NextResponse.json({
            status: true,
            results,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: false,
            message: "An error occurred",
        });
    }
};

