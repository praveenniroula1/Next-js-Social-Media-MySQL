import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
      const userId = await getDataFromToken(request);
  
      const db = await connectDB();
  
      const postsQuery = `
        SELECT p.postId, p.userId, u.name AS userName, p.description, p.createdAt, i.url AS image
FROM posts p
LEFT JOIN imagetable i ON p.postId = i.postId
JOIN follow f
    ON (f.requestSenderId = p.userId OR f.requestReceiverId = p.userId)
JOIN users u ON p.userId = u.id
WHERE (f.requestSenderId = 16 OR f.requestReceiverId = 16)
  AND f.accepted = 1
  AND p.userId != 16
ORDER BY p.createdAt DESC;`;
  
      const [posts] = await db.query(postsQuery, [userId,userId]);
  
      return NextResponse.json({
        status: "success",
        posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({
        status: "error",
        message: "An error occurred while fetching posts",
      });
    }
  };