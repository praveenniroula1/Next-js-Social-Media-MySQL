import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        // Get the authenticated user's ID from the token
        const id = await getDataFromToken(request);

        // Connect to the database
        const db = await connectDB();

        // Query to get all users that the authenticated user has followed, with accepted = true
        const query = `
      SELECT usersTable.id, usersTable.name, usersTable.email
FROM users AS usersTable
LEFT JOIN follow AS followTable
ON usersTable.id = followTable.requestReceiverId
  AND followTable.requestSenderId = ? 
  AND followTable.accepted = 1
WHERE followTable.requestReceiverId IS NULL;
  `;

        // Execute the query
        const [results]: any = await db.query(query, [id]);

        if (results.length === 0) {
            return NextResponse.json({
                status: "error",
                message: "No followed users found",
            });
        }

        return NextResponse.json({
            status: 'success',
            message: "Followed users retrieved successfully",
            mayKnowUsers: results
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        })
    }
}