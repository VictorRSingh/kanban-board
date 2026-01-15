
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if(!email || !password) {
            return NextResponse.json({
                error: "Missing email or password",
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid credentials",
                status: 401
            })
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({
                error: "Invalid credentials",
                status: 401
            })
        }

        return NextResponse.json({
            id: user.id,
            email: user.email
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error", status: 500 });
    }
}