import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY || '';

// Function to authenticate token and return user data
export const authenticateToken = ({ req }) => {
  if (
    req.body.operationName === 'loginUser' ||
    req.body.operationName === 'addUser'
  ) {
    return {};
  }

  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return {};
  }

  try {
    if (!SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not configured');
    }

    const { data } = jwt.verify(token, SECRET_KEY);
    return { user: data };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('Token has expired');
      throw new AuthenticationError('Your session has expired. Please log in again.');
    }
    console.log('Invalid token:', err);
    throw new AuthenticationError('Invalid token. Please log in again.');
  }
};

// Function to sign a token with user data
export const signToken = (username, email, _id) => {
  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY not configured');
  }

  return jwt.sign({
    data: { username, email, _id },
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12) // 12 hours
  },
  SECRET_KEY
  );
};

export class AuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }
}
