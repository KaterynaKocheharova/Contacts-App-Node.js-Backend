import {
  registerUser,
  loginUser,
  logOut,
  refreshUsersSession,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

// ========================================== REGISTER

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

// ======================================= LOGIN

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const userData = {
    email,
    password,
  };
  const { accessToken, refreshToken, sessionId } = await loginUser(userData);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: {
      accessToken,
    },
  });
};

// =============================== LOGOUT

export const logOutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await logOut(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// ============================== REFRESH
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie('sessionId', session.sessionId, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed the session',
    data: {
      accessToken: session.accessToken,
    },
  });
};
