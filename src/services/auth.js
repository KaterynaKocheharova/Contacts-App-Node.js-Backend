import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

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

// other code
};
