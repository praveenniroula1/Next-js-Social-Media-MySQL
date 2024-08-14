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
            WHERE u.id != ? AND (f.accepted IS NULL OR f.accepted = 0) AND (f.status IS NULL OR f.status = 'unsent')
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


export const sendNotification = async (senderId: number, receiverId: number, message: string) => {
    try {
        const db = await connectDB();
        const insertNotificationQuery = `
            INSERT INTO notifications (senderId, receiverId, message, createdAt)
            VALUES (?, ?, ?, NOW())
        `;
        await db.query(insertNotificationQuery, [senderId, receiverId, message]);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};


export const POST = async (request: NextRequest) => {
    try {
        const loggedInUserId = await getDataFromToken(request);
        const { requestReceiverId } = await request.json();
        const db = await connectDB();

        // Fetch the sender's name
        const senderQuery = `
            SELECT name
            FROM users
            WHERE id = ?
        `;
        const [senderResult]: any = await db.query(senderQuery, [loggedInUserId]);
        const senderName = senderResult[0].name;

        // Check if a follow request already exists
        const checkQuery = `
            SELECT * FROM follow
            WHERE requestSenderId = ? AND requestReceiverId = ?
        `;
        const [existingFollow]: any = await db.query(checkQuery, [loggedInUserId, requestReceiverId]);

        if (existingFollow.length > 0) {
            return NextResponse.json({
                status: "error",
                message: "Follow request already exists",
            });
        }

        // Insert a new follow request
        const insertQuery = `
            INSERT INTO follow (requestSenderId, requestReceiverId, accepted, status)
            VALUES (?, ?, false, 'sent')
        `;
        await db.query(insertQuery, [loggedInUserId, requestReceiverId]);

        // Insert a notification
        const notificationQuery = `
            INSERT INTO notifications (userId, senderId, senderName, message, createdAt)
            VALUES (?, ?, ?, 'You have a new follow request', NOW())
        `;
        await db.query(notificationQuery, [requestReceiverId, loggedInUserId, senderName]);

        return NextResponse.json({
            status: "success",
            message: "Follow request sent successfully",
        });
    } catch (error) {
        console.error("Error details:", error);
        return NextResponse.json({
            status: "error",
            message: "Something went wrong",
        });
    }
};