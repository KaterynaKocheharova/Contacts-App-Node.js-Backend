import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const createSession = (id) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  return {
    sessionId: id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
