import { NextRequest } from "next/server";
import { getConnection } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const pool = await getConnection();
    const url = new URL(req.url);
    const coachId = url.searchParams.get('userId');
    
    const result = await pool.request()
    .input('userId', coachId)
    .query("SELECT * FROM sessions Where CoachId = @userId");

    return Response.json(result.recordset);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to fetch sessions" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
