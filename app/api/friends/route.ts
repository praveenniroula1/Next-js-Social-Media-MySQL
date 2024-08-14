// Get User in People you may know

import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const loggedInUserId = await getDataFromToken(request);
        const db = await connectDB();

        const query = `
           SELECT u.*
FROM users u
LEFT JOIN follow f 
ON u.id = f.requestReceiverId AND f.requestSenderId = ?
WHERE u.id != ? AND f.accepted = 1 AND f.status = 'sent';

        `;

        const [results]: any = await db.query(query, [loggedInUserId, loggedInUserId]);

        if (results.length === 0) {
            return NextResponse.json({
                status: "error",
                message: "No users found",
            });
        }

        return NextResponse.json({
            status: "success",
            data: results,
        });
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: "Something went wrong",
        });
    }
}


export const PATCH = async (request: NextRequest) => {
    try {
        const loggedInUserId = await getDataFromToken(request);
        const { idToUnfollow } = await request.json();
        const db = await connectDB();

        const query = `
            UPDATE follow 
            SET accepted = 0, status = 'notsent'
            WHERE requestSenderId = ? AND requestReceiverId = ?;
        `;

        const [result]: any = await db.query(query, [loggedInUserId, idToUnfollow]);

        if (result.affectedRows === 0) {
            return NextResponse.json({
                status: "error",
                message: "Unfollow operation failed or no matching record found",
            });
        }

        return NextResponse.json({
            status: "success",
            message: "User unfollowed successfully",
        });
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: "Something went wrong",
        });
    }
}