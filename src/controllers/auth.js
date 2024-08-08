import {
  registerUser,
  loginUser,
  logOut,
  refreshUsersSession,
  requestResetEmail,
  resetPassword,
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
    status: 201,
    message: 'Successfully registered the user',
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
    message: 'Successfully logged in the user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// ============================== REFRESH

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    userId: req.cookies.userId,
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

// =============================== LOGOUT

export const logOutController = async (req, res) => {
  const { userId } = req.cookies;
  if (userId) {
    await logOut(userId);
  }

  res.clearCookie('userId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// ============================ REQUEST RESET PASSWORD

export const requestResetEmailController = async (req, res) => {
  const { email } = req.body;
  await requestResetEmail(email);
  res.status(200).json({
    status: 200,
    message: 'Reset password email successfully sent',
    data: {},
  });
};

//  ============================ RESET PASSWORD

export const resetPasswordController = async (req, res) => {
  await resetPassword({ password: req.body.password, token: req.body.token });
  res.status(200).json({
    status: 200,
    message: 'Password successfully reset',
    data: {},
  });
};
