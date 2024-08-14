import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {
    try {
        const loggedInUserId = await getDataFromToken(request);
        const db = await connectDB();

        const query = `
            SELECT n.*, u.name AS receiverName
            FROM notifications n
            JOIN users u ON n.userId = u.id
            WHERE n.userId = ?
            ORDER BY n.createdAt DESC
        `;
        const [notifications]: any = await db.query(query, [loggedInUserId]);

        return NextResponse.json({
            status: "success",
            data: notifications,
        });
    } catch (error) {
        console.error("Error details:", error);
        return NextResponse.json({
            status: "error",
            message: "Something went wrong",
        });
    }
}