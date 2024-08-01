import { ONE_DAY } from '../constants';

export const setUpCookies = (refreshToken, sessionId, res) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};
