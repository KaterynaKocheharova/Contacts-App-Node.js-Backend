import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import {SessionsCollection} from '../db/models/session.js';

export const registerUser = async (userData) => {
  const user = await UsersCollection.findOne({ email: userData.email });
  if (user) {
    throw createHttpError(409, 'User with this email already exists');
  }
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  return UsersCollection.create({ ...userData, password: encryptedPassword });
};

export const loginUser = async (userData) => {
  const user = await UsersCollection.findOne({
    email: userData.email,
  });
  if (!user) {
    throw createHttpError(
      404,
      'User with the give email not found.',
    );
  }
  const isCorrectPassowrd = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isCorrectPassowrd) {
    throw createHttpError(404, 'Anauthorized. Incorrect password');
  }

  SessionsCollection.deleteOne({
    userId: user._id
  });

  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil
  });
};
