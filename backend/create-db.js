const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root'
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS gautam_solar_audit');
    console.log('✅ Database "gautam_solar_audit" created successfully!');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createDatabase();
