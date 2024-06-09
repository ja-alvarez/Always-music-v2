import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'db_always_music_v2',
    idleTimeoutMillis: 1000
});

export default pool; 