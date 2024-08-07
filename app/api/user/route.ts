import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const id = await getDataFromToken(request);
        const db = await connectDB()
        const query = `select * from users where id=?`
        const [result]: any = await db.query(query, [id])

        if (result.length === 0) {
            return NextResponse.json({
                mesaaage: "User NOT found",
                status: "error"
            })
        }

        const user = result[0]

        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })


    } catch (error) {
        console.log(error)
    }
}