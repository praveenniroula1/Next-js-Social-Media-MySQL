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

        const notificationQuery = `SELECT * from notifications where userId=?`;

        const [rows] = await db.query(notificationQuery, [userDetails.id]);
        return NextResponse.json({
            status: "success",
            message: "User Found",
            rows,
        });

    } catch (error) {
        console.log(error)
    }

}

export const PATCH = async (request: NextRequest) => {
    try {
        const { requestSenderId } = await request.json();
        const requestReceiverId = await getDataFromToken(request);

        const db = await connectDB();

        const updateFollowQuery = `
        UPDATE follow 
        SET accepted = 1 
        WHERE requestSenderId = ? 
        AND requestReceiverId = ? 
        AND accepted = 0`;

        const [result]: any = await db.query(updateFollowQuery, [requestSenderId, requestReceiverId]);

        if (result.affectedRows === 0) {
            return NextResponse.json({
                status: "error",
                message: "No follow request found or request already accepted",
            });
        }

        return NextResponse.json({
            status: "success",
            message: "Friend request accepted",
        });

    } catch (error) {
        console.error("Error accepting friend request:", error);
        return NextResponse.json({
            status: "error",
            message: "An error occurred while accepting the friend request",
        });
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const { notificationId } = await request.json(); 
        const userId = await getDataFromToken(request);

        const db = await connectDB();

        const deleteNotificationQuery = `
        DELETE FROM notifications 
        WHERE notificationId = ? 
        AND userId = ?`;

        const [result]: any = await db.query(deleteNotificationQuery, [notificationId, userId]);

        if (result.affectedRows === 0) {
            return NextResponse.json({
                status: "error",
                message: "Notification not found or already deleted",
            });
        }

        return NextResponse.json({
            status: "success",
            message: "Notification deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting notification:", error);
        return NextResponse.json({
            status: "error",
            message: "An error occurred while deleting the notification",
        });
    }
};