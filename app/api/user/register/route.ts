import { connectDB } from "@/app/DB-Config/dbCOnfig";
import { UserService } from "@/app/service/userService";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;
        const userService = new UserService();
        const user = await userService.createUser(name, email, password);

        return NextResponse.json({
            status: "success",
            message: "User Created Successfully",
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error:any) {
        return NextResponse.json({
            status: "error",
            message: "User creation failed",
            error: error.message
        });
    }
};