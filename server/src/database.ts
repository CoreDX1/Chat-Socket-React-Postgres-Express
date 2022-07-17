import {Pool} from 'pg'


const pool = new Pool({
    user: "christian",
    password: "index",
    database: "core",
    host: "127.0.0.1",
    port: 5438
})

export default pool;