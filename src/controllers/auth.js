import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const {name, email, password} = req.body;

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
