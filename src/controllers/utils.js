import { ONE_DAY } from '../constants/index.js';

export const setupCookies = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session.sessionId, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
  };
