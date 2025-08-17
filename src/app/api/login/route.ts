import { NextRequest } from 'next/server';
import sql from 'mssql';
import { getConnection } from '../../../../lib/db'; // make sure this exists


export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
  

    // const result = await pool.request()
    //   .input('Username', sql.NVarChar(100), username)
    //   .input('Password',sql.NVarChar(), password)
    //   .query('SELECT * FROM Users WHERE Username = @Username AND Password = @Password');
const result = {
  recordset: [
    { id: 1, username: 'user1', password: 'pass1', Role: 'coach' },
  ]
};
    const user = result.recordset[0];
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Login successful', user: user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}