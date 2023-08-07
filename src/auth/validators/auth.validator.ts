import * as joi from 'joi'

export const authValidator = joi.object({
    email:joi.string().email().required().messages({
        'any.string': 'email should be of type text',
        'any.required': 'email is a required field'
    }),
    password: joi.string().required().messages({
        'any.string': 'password should be of type text',
        'any.required': 'password is a required field'
    })
    
})