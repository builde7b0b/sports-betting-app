import { APIGatewayProxyHandler } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: '',
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
  console.log('Getting signing key for kid:', header.kid);
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    console.log('Signing key found:', !!signingKey);
    callback(null, signingKey);
  });
};

const verifyToken = (token: string): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    console.log('Verifying token');
    jwt.verify(token, getKey, {
      audience: '',
      issuer: '',
      algorithms: ['RS256'],
    }, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        reject(err);
      } else {
        console.log('Token verified successfully');
        resolve(decoded as jwt.JwtPayload);
      }
    });
  });
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const authHeader = event.headers?.Authorization || event.headers?.authorization;
    
    if (!authHeader) {
      console.log('No Authorization header found');
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'No Authorization header provided' }),
      };
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('No token found in Authorization header');
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'No token provided in Authorization header' }),
      };
    }

    console.log('Token extracted:', token);
    const decodedToken = await verifyToken(token);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Authentication successful',
        user: decodedToken.sub,
      }),
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Authentication failed',
        error: (error as Error).message,
      }),
    };
  }
};