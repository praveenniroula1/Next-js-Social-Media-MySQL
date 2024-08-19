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
        const peopleYouMayKnowQuery = `
        SELECT * 
        FROM users u 
        WHERE u.id NOT IN (
            SELECT f.requestReceiverId 
            FROM follow f 
            WHERE f.requestSenderId = ? AND f.accepted = 1
            UNION
            SELECT f.requestSenderId 
            FROM follow f 
            WHERE f.requestReceiverId = ? AND f.accepted = 1
        ) 
        AND u.id != ?;
    `;

        const [rows] = await db.query(peopleYouMayKnowQuery, [userDetails.id, userDetails.id,userDetails.id]);
        return NextResponse.json({
            status: "success",
            message: "User Found",
            rows,
        });

    } catch (error) {
        console.log(error)
    }

}
export const POST = async (request: NextRequest) => {
  try {
    const { idToFollow } = await request.json();
    const id = await getDataFromToken(request);

    const db = await connectDB();

    const checkFollowQuery = `
      SELECT * FROM follow 
      WHERE requestSenderId = ? 
      AND requestReceiverId = ?`;
    const [existingFollow]: any = await db.query(checkFollowQuery, [id, idToFollow]);

    if (existingFollow.length > 0) {
      return NextResponse.json({
        status: "error",
        message: "Follow request already sent",
      });
    }

    const followQuery = `
      INSERT INTO follow (requestSenderId, requestReceiverId, accepted, status)
      VALUES (?, ?, 0, 'sent')`;
    await db.query(followQuery, [id, idToFollow]);

    const senderQuery = `SELECT name FROM users WHERE id = ?`;
    const [senderData]: any = await db.query(senderQuery, [id]);
    const senderName = senderData[0].name;

    const notificationQuery = `
      INSERT INTO notifications (userId, type, message, senderId, senderName)
      VALUES (?, 'follow_request', ?, ?, ?)`;
    const message = `${senderName} sent you a friend request.`;
    await db.query(notificationQuery, [idToFollow, message, id, senderName]);

    return NextResponse.json({
      status: "success",
      message: "Follow request sent and notification created",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "error",
      message: "An error occurred while processing the follow request",
    });
  }
};