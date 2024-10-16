import { APIGatewayProxyHandler } from "aws-lambda";
import mysql from "mysql2/promise";
import { checkJwt } from "./checkJwt"; // Auth0 middleware

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = event.body ? JSON.parse(event.body) : null;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" })
    };
  }
  const { userId, matchId, betAmount, odds } = body;
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "bets_db"
  });

  const [result] = await connection.execute(
    "INSERT INTO bets (user_id, bet_amount, bet_type, bet_outcome, created_at, updated_at) VALUES (?, ?, ?, 'pending', NOW(), NOW())",
    [userId, betAmount, odds]
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Bet placed successfully", betId: (result as mysql.ResultSetHeader).insertId })
  };
};


