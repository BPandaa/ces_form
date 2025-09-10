import { NextResponse } from 'next/server';
import sql from 'mssql';

const config: sql.config = {
  server: process.env.SQL_SERVER!,
  port: Number(process.env.SQL_PORT),
  database: process.env.SQL_DATABASE!,
  user: process.env.SQL_USER!,
  password: process.env.SQL_PASSWORD!,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export async function GET() {
  let columnCheck = null;
  
  try {
    console.log('Testing database connection...');
    console.log('Config:', {
      server: process.env.SQL_SERVER,
      port: process.env.SQL_PORT,
      database: process.env.SQL_DATABASE,
      user: process.env.SQL_USER,
      password: '***hidden***'
    });

    const pool = await sql.connect(config);
    console.log('Database connected successfully');

    // Test if table exists
    const tableCheck = await pool.request()
      .query(`
        SELECT COUNT(*) as table_count 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_NAME = 'ces_housebuilders'
      `);
    
    const tableExists = tableCheck.recordset[0].table_count > 0;
    console.log('Table exists:', tableExists);

    if (tableExists) {
      // Test table structure
      columnCheck = await pool.request()
        .query(`
          SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'ces_housebuilders'
          ORDER BY ORDINAL_POSITION
        `);
      
      console.log('Table columns:', columnCheck.recordset);
    }

    await pool.close();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      tableExists,
      columns: tableExists && columnCheck ? columnCheck.recordset : null,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}