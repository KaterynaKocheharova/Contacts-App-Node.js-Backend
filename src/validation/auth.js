import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": "Name should me a string",
        "string.min": "Name should have at least 3 characters",
        "string.max": "Name should have 30 characters at max"
    }
),
});
