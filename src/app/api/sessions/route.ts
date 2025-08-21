import { NextRequest } from "next/server";
import { getConnection } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    // const pool = await getConnection();
    // const url = new URL(req.url);
    // const coachId = url.searchParams.get('userId');
    
    // const result = await pool.request()
    // .input('userId', coachId)
    // .query("SELECT * FROM sessions Where CoachId = @userId");

const result = {
  recordset: [
    { id: 1, coachId: 'coach123', Date: '2024-01-15', Time: '10:00', sessionType: 'Matchday' },
    { id: 2, coachId: 'coach123', Date: '2024-01-16', Time: '14:30', sessionType: 'Public session' },
    { id: 3, coachId: 'coach123', Date: '2024-01-17', Time: '09:00', sessionType: 'Private session' },
    { id: 4, coachId: 'coach123', Date: '2024-01-18', Time: '16:00', sessionType: 'individual' },
    { id: 5, coachId: 'coach123', Date: '2024-01-19', Time: '11:30', sessionType: 'Coach meeting' }
  ]
};  

return Response.json(result.recordset);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to fetch sessions" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
