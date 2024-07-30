import { registerUser, loginUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const userData = {
    name,
    email,
    password,
  };

  const createdUser = await registerUser(userData);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: createdUser,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const userData = {
    email,
    password,
  };

  const session = await loginUser(userData);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session.userId, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: "Successfully logged in",
    data: {
      accessToken: session.accessToken
    }
  });
};
