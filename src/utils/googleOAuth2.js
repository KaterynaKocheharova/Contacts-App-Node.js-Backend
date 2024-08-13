import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'fs/promises';
import { env } from './env.js';
import createHttpError from 'http-errors';

const PATH_JSON = path.join(path.resolve('google-oauth.json'));
const authConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: authConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  console.log(code);
  const response = await googleOAuthClient.getToken(code);
  console.log(response);
  // if (!response.tokens.id_token) {
  //   throw createHttpError(401, 'Anauthorized');
  // }
  // const ticket = await googleOAuthClient.verifyIdToken({
  //   id_token: response.tokens.id_token,
  // });

  // return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';

  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
