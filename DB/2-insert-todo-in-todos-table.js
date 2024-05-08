require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {

        const rows = await sql`
        INSERT INTO todos (todo,status)
        VALUES ('ngaji',0)
        `;
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()