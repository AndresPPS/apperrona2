import pkg from "pg"
const { Pool } = pkg

const pool = new Pool ({
    user: "postgres",
    host:"localhost",
    database: "postgres",
    password: "naruto2010",
    port: 5432
})

export async function POST ({request}){
    let frontData = await request.json()
    console.log (frontData)
    const client = await pool.connect()
    const insertQuery = `UPDATE tareas SET completado = $1 WHERE id = $2`
    const values = [frontData.completado, frontData.id]
    const result = await client.query(insertQuery, values)
    
    client.release()
        return new Response ("todo bien", {status:200})
}