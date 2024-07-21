import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    const body = req.body;
    try {
      await schema.validateAsync(body, { abortEarly: false });
      next();
    } catch (error) {
      const validationError = createHttpError(404, 'Bad request', {
        errors: error.message,
      });
      next(validationError);
    }
  };
};
