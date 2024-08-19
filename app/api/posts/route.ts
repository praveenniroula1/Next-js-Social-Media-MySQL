import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getDataFromToken } from "@/app/components/Helpers/getDataFromToken";
import { connectDB } from "@/app/DB-Config/dbCOnfig";

export const POST = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request);
    const db = await connectDB();
    const formData = await request.formData();
    const file = formData.get("images") as File;
    const description = formData.get("description");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const uniqueFileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", uniqueFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFileName}`;

    const postQuery = `INSERT INTO posts (userId, description) VALUES (?, ?)`;
    const [postResult]: any = await db.query(postQuery, [id, description]);
    const postId = postResult.insertId;

    const imageQuery = `INSERT INTO imagetable (userId, postId, url) VALUES (?, ?, ?)`;
    await db.query(imageQuery, [id, postId, fileUrl]);


    return NextResponse.json({
      message: "File uploaded successfully",
      postId,
      fileUrl,
    });
  } catch (error) {
    console.error("Error processing form data", error);
    return NextResponse.json(
      { message: "Error processing form data" },
      { status: 500 }
    );
  }
};


export const GET = async (request: NextRequest) => {

  const id = await getDataFromToken(request);
  if (!id) {
    return NextResponse.json("Dont have id to fetch the posts")
  }
  const db = await connectDB();
  const query = `SELECT p.postId, p.userId, p.description, p.createdAt, i.imageId, i.url
FROM posts p
LEFT JOIN imagetable i ON p.postId = i.postId AND p.userId = i.userId
WHERE p.userId = ?`
  const [results]: any = await db.query(query, [id])
  if (results.length === 0) {
    return NextResponse.json({
      status: false,
      message: "Could not get any results"
    })
  }
  const postLength=results.length
  return NextResponse.json({
    status: true,
    results,
    postLength
  })

}