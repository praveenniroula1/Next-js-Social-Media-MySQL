import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const id = await getDataFromToken(request);

        const db = await connectDB();

        const userQuery = `SELECT * FROM users WHERE id = ?`;
        const [userResults]: any = await db.query(userQuery, [id]);

        if (userResults.length === 0) {
            return NextResponse.json({
                status: "error",
                message: "No user found",
            });
        }

        const friendsQuery = `
            SELECT u.*
            FROM follow f
            JOIN users u ON f.requestReceiverId = u.id
            WHERE f.requestSenderId = ? AND f.accepted = 1
            UNION
            SELECT u.*
            FROM follow f
            JOIN users u ON f.requestSenderId = u.id
            WHERE f.requestReceiverId = ? AND f.accepted = 1`;

        const [friends] = await db.query(friendsQuery, [id, id]);

        return NextResponse.json({
            status: "success",
            friends,
        });
    } catch (error) {
        console.error("Error fetching friends:", error);
        return NextResponse.json({
            status: "error",
            message: "An error occurred while fetching friends",
        });
    }
};


export const DELETE = async (request: NextRequest) => {
    try {
      const { idToUnfollow } = await request.json();
      const id = await getDataFromToken(request);
  
      const db = await connectDB();
  
      const deleteFollowQuery = `
        DELETE FROM follow 
        WHERE (requestSenderId = ? AND requestReceiverId = ?) 
        OR (requestSenderId = ? AND requestReceiverId = ?)`;
      await db.query(deleteFollowQuery, [id, idToUnfollow, idToUnfollow, id]);
  
      return NextResponse.json({
        status: "success",
        message: "Unfollowed successfully",
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      return NextResponse.json({
        status: "error",
        message: "An error occurred while unfollowing",
      });
    }
  };