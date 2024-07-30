import {
  registerUser,
  loginUser,
  logOut,
  refreshUsersSession,
} from '../services/auth.js';
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

};

export const logOutController = async (req, res) => {

};

const setupSession = (res, session) => {

};

export const refreshUserSessionController = async (req, res) => {

};
