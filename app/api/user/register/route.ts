import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json(); // Await the request.json() call
        const { name, email, password } = reqBody;

        const db = await connectDB(); // Await the DB connection

        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

        // Execute the query using async/await
        const [result] = await db.query(query, [name, email, password]);

        return NextResponse.json({
            status: "success",
            message: "User Created Successfully",
            user: { name, email, password },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: "error",
            message: "User creation failed",
            error: error,
        });
    }
};