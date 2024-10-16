import pkg from "pg"
const { Pool } = pkg

const pool = new Pool ({
    user: "postgres",
    host:"localhost",
    database: "postgres",
    password: "naruto2010",
    port: 5432
})

export async function DELETE({request}){
    let frontData = await request.json()
    console.log (frontData)
    const client = await pool.connect()
    const insertQuery = `DELETE FROM tareas WHERE id = $1`
    const values = [frontData.id]
    const result = await client.query(insertQuery, values)
    
    client.release()
        return new Response ("todo bien", {status:200})
}