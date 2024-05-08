require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    const deleteTable = await sql`drop table if exists todos`;

    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        todo VARCHAR(250) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        status INTEGER DEFAULT 0
    ) 
    `;
    console.log(createTable)
}

execute()