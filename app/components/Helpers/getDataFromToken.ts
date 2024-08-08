import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""

        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken: any = jwt.verify(token, "secret1")

        return decodedToken.id

    } catch (error) {
        console.log(error)
        return null;
    }
}