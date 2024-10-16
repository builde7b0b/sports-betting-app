import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { handler } from './bet';
import mysql from 'mysql2/promise';

jest.mock('mysql2/promise');

describe('Bet Handler', () => {
  let mockExecute: jest.Mock;
  let mockConnection: any;

  beforeEach(() => {
    mockExecute = jest.fn();
    mockConnection = {
      execute: mockExecute,
    };
    (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if no body is provided', async () => {
    const event = { body: null } as APIGatewayProxyEvent;
    const result = await handler(event, {} as Context, () => {});

    expect(result).toBeDefined();
    expect((result as APIGatewayProxyResult).statusCode).toBe(400);
  });

  it('should successfully place a bet and return 200', async () => {
    const event = {
      body: JSON.stringify({
        userId: '123',
        matchId: '456',
        betAmount: 100,
        odds: 1.5,
      }),
    } as APIGatewayProxyEvent;

    mockExecute.mockResolvedValue([{ insertId: 789 }]);

    const result = await handler(event, {} as Context, () => {});

    expect(result).toBeDefined();
    expect((result as APIGatewayProxyResult).statusCode).toBe(200);
    expect(JSON.parse((result as APIGatewayProxyResult).body)).toEqual({
      message: 'Bet placed successfully',
      betId: 789,
    });
    expect(mockExecute).toHaveBeenCalledWith(
      expect.any(String),
      ['123', 100, 1.5]
    );
  });

  it('should handle database errors', async () => {
    const event = {
      body: JSON.stringify({
        userId: '123',
        matchId: '456',
        betAmount: 100,
        odds: 1.5,
      }),
    } as APIGatewayProxyEvent;

    mockExecute.mockRejectedValue(new Error('Database error'));

    await expect(handler(event, {} as Context, () => {})).rejects.toThrow('Database error');
  });
});