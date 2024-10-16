import { APIGatewayProxyHandler } from 'aws-lambda';
import * as mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'bets_db',
};

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // Example query
    const [rows] = await connection.execute('SELECT * FROM bets LIMIT 10');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Connected to database successfully',
        data: rows,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error connecting to database',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  } finally {
    if (connection) await connection.end();
  }
};