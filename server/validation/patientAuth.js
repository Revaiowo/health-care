import Joi from 'joi';

export const loginSchema = Joi.object({
    
    email: Joi.string().email().required(),
    
    password: Joi.string().min(4).max(20).required()
})    
    
export const registerSchema = loginSchema.keys({

    firstName: Joi.string().required(),

    lastName: Joi.string().required(),

    confirmPassword: Joi.string().required(),

    gender: Joi.string().required(),

    phoneNumber: Joi.string()
        .pattern(/^\+?([0-9]{2,3})?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .required()
        .messages({
        'string.pattern.base': 'Phone number must be in a valid format (e.g., +1-234-567-8900 or 2345678900)',
        'string.empty': 'Phone number cannot be empty',
        'any.required': 'Phone number is required'
        }),

    dob: Joi.string().required(),
});
