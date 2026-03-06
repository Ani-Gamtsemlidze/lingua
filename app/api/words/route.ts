import { NextRequest } from "next/server";
import { sql } from "@/lib/db";
export async function GET () {
    const data = await sql`SELECT * FROM words`
    return Response.json(data);
      
}