import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
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
  distance: Joi.number().required(),
  loggedUserEmail: Joi.string().email().required(),
});

export const emailUserSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const updatePropertySchema = Joi.object({
  price: Joi.number().optional(),
  mailOwner: Joi.string().email().optional(),
  city: Joi.string().optional(),
  street: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  numSleeps: Joi.number().optional(),
  numBedrooms: Joi.number().optional(),
  distance: Joi.number().optional(),
  loggedUserEmail: Joi.string().email().required(),
});

const dateRegex =
  /^(0[1-9]|[1-2][0-9]|3[0-1])[\/\-](0[1-9]|1[0-2])[\/\-](\d{4})$/;
export const createBookingSchema = Joi.object({
  idProperty: Joi.number().required(),
  renterEmail: Joi.string().email().required(),
  startDate: Joi.string().regex(dateRegex).required(),
  endDate: Joi.string().regex(dateRegex).required(),
  nbGuests: Joi.number().required(),
  review: Joi.string().optional(),
  loggedUserEmail: Joi.string().email().required(),
});
