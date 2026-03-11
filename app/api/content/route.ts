import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "content.md");
        const fileContents = fs.readFileSync(filePath, "utf8");

        return NextResponse.json({ content: fileContents });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to read content" },
            { status: 500 }
        );
    }
}
