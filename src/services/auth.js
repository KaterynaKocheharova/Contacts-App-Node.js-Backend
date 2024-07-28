import { UsersCollection } from "../db/models/user.js";

export const registerUser = (userData) => UsersCollection.create(userData);
