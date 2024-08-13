import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
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
        const followSenderDetails = results[0];

        const body: any = request.json()
        const { followReceiverDetails } = body

        const insertQuery = `INSERT INTO follow (requestSenderId, requestReceiverId, accepted, status) VALUES (?, ?, ?, ?)`;
        const [response] = await db.query(insertQuery, [followSenderDetails.id, followReceiverDetails.id, 0, "sent"])

        return NextResponse.json({
            status: 'success',
            message: "Successfully followed the user",
            response
        })



    } catch (error) {
        return NextResponse.json({
            error
        })
    }
}


export const GET = async (request: NextRequest) => {
    try {
        // Get the authenticated user's ID from the token
        const id = await getDataFromToken(request);

        // Connect to the database
        const db = await connectDB();

        // Query to get all users that the authenticated user has followed, with accepted = true
        const query = `
            SELECT usersTable.id, usersTable.name, usersTable.email
            FROM follow followTable
            JOIN users usersTable ON followTable.requestReceiverId = usersTable.id
            WHERE followTable.requestSenderId = ?
              AND followTable.accepted = 1
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
            followedUsers: results
        });

    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: "An error occurred while retrieving followed users",
            error
        });
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const followId = searchParams.get('followId');

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

        const updateQuery = `update follow set accepted=0, status="notsent" where requestSenderId=? AND requestReceiverId=?`
        const [rows] = await db.query(updateQuery, [userDetails.id, followId])

        return NextResponse.json({
            status: true,
            message: "successfully unfollowed",
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: "An error occurred while retrieving followed users",
            error
        });
    }
}