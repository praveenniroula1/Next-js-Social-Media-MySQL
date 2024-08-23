// app/api/newsfeed/route.tsx
import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const db = await connectDB();
    const postsQuery = `
      SELECT 
        p.postId, 
        p.userId, 
        u.name AS userName, 
        p.description, 
        p.createdAt, 
        i.url AS imageUrl,
        COUNT(pl.id) AS likeCount
      FROM 
        follow f
      JOIN 
        posts p ON f.requestReceiverId = p.userId OR f.requestSenderId = p.userId
      JOIN 
        users u ON p.userId = u.id
      LEFT JOIN 
        imagetable i ON p.postId = i.postId
      LEFT JOIN 
        post_likes pl ON p.postId = pl.postId
      WHERE 
        (f.requestSenderId = ? OR f.requestReceiverId = ?) 
        AND p.userId != ?
        AND f.accepted = 1
      GROUP BY 
        p.postId, p.userId, u.name, p.description, p.createdAt, i.url
      ORDER BY 
        p.createdAt DESC;
    `;
    const [posts] = await db.query(postsQuery, [userId, userId, userId]);

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
