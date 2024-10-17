import Joi from 'joi';

export const loginSchema = Joi.object({
    
    email: Joi.string().email().required(),
    
    password: Joi.string().min(4).max(20).required()
})    
    
export const registerSchema = loginSchema.keys({

    displayName: Joi.string().required(),

});
