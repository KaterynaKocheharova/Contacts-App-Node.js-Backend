import {
  registerUser,
  loginUser,
  logOut,
  refreshUsersSession,
} from '../services/auth.js';
import { setupCookies } from './utils.js';

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
    status: 200,
    message: 'Successfully registered a user',
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
  const session = await loginUser(userData);

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user',
    data: {
      accessToken: session.accessToken,
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

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed the session',
    data: {
      accessToken: session.accessToken,
    },
  });
};
