import Joi from "joi";


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().optional(),
});


export const createPropertySchema = Joi.object({
    price: Joi.number().required(),
    mailOwner: Joi.string().email().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    zipCode: Joi.string().required(),
    numSleeps: Joi.number().required(),
    numBedrooms: Joi.number().required(),
    distance: Joi.number().required()
});
export const emailUserSchema = Joi.object({
    email: Joi.string().email().required()
});

export const updatePropertySchema = Joi.object({
    price: Joi.number().optional(),
    mailOwner: Joi.string().email().optional(),
    city: Joi.string().optional(),
    street: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    numSleeps: Joi.number().optional(),
    numBedrooms: Joi.number().optional(),
    distance: Joi.number().optional()
});
