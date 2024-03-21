import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  registerSchema,
  createPropertySchema,
  emailUserSchema,
  updatePropertySchema,
  createBookingSchema,
} from "./validation_schema";
import dateParser from "./dateParser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function loginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateMiddleware(loginSchema)(req, res, next);
}

export function registerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateMiddleware(registerSchema)(req, res, next);
}
export function createPropertyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateMiddleware(createPropertySchema)(req, res, next);
}
export function isEmailValidMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateMiddleware(emailUserSchema)(req, res, next);
}
export function updatePropertyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateMiddleware(updatePropertySchema)(req, res, next);
}

export function createBookingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateMiddleware(createBookingSchema)(req, res, next);
}
function validateMiddleware(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Failed", error: error.details[0].message });
    }
    next();
  };
}

export function validateDateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { startDate, endDate } = req.body;

  const startDateObj = dateParser(startDate);
  const endDateObj = dateParser(endDate);

  // Vérifier si startDate et endDate sont des dates valides
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    return res
      .status(400)
      .json({ message: "Les dates de début et de fin ne sont pas valides." });
  }

  // Vérifier si startDate est avant endDate
  if (startDateObj >= endDateObj) {
    return res
      .status(400)
      .json({
        message: "La date de début doit être antérieure à la date de fin.",
      });
  }

  // Mettre à jour le corps de la requête avec les dates en tant qu'objets Date
  req.body.startDate = startDateObj;
  req.body.endDate = endDateObj;

  // Passer au prochain middleware
  next();
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le JWT du header Authorization

  if (!token) {
    return res.status(401).json({ message: "Non autorisé. Token manquant." });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
    //TOKEN DECODED
    req.body.loggedUserEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Non autorisé. Token invalide." });
  }
}
