import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const id = await getDataFromToken(request);
        const db = await connectDB();
        const query = `SELECT * FROM users WHERE id=?`;
        const [results]: any = await db.query(query, [id]);

        if (results.length === 0) {
            return NextResponse.json({
                status: "error",
                message: "No user found",
            });
        }
        const userDetails = results[0];

        const body = await request.json();
        const { postId, liked }: any = body;

        // Check if the like already exists
        const checkQuery = `SELECT * FROM post_likes WHERE userId=? AND postId=?`;
        const [checkResponse]: any = await db.query(checkQuery, [userDetails.id, postId]);

        if (liked) {
            // Insert new like
            if (checkResponse.length > 0) {
                return NextResponse.json({
                    status: "error",
                    message: "Already liked",
                });
            }
            const insertQuery = `INSERT INTO post_likes (userId, postId) VALUES (?, ?)`;
            await db.query(insertQuery, [userDetails.id, postId]);
            return NextResponse.json({
                status: "success",
                message: "Like stored",
            });
        } else {
            // Remove like
            if (checkResponse.length === 0) {
                return NextResponse.json({
                    status: "error",
                    message: "Like does not exist",
                });
            }
            const deleteQuery = `DELETE FROM post_likes WHERE userId=? AND postId=?`;
            await db.query(deleteQuery, [userDetails.id, postId]);
            return NextResponse.json({
                status: "success",
                message: "Like removed",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "error",
            message: "An error occurred",
        });
    }
};

export const GET = async (request: NextRequest) => {
    try {
      const url = new URL(request.url);
      const postId = url.searchParams.get('postId');
  
      if (!postId) {
        return NextResponse.json({
          status: "error",
          message: "Post ID is required",
        });
      }
  
      const db = await connectDB();
      const query = `SELECT COUNT(*) as likeCount FROM post_likes WHERE postId=?`;
      const [results]: any = await db.query(query, [postId]);
  
      return NextResponse.json({
        status: "success",
        likeCount: results[0].likeCount,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        status: "error",
        message: "An error occurred",
      });
    }
  };
