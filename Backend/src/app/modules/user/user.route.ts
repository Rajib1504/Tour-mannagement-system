import { NextFunction, Request, Response, Router } from "express";
import { UserControlers } from "./user.controller";
import { createUserZodSchema, createGoogleUserZodSchema } from './user.validation';
import { validateRequest } from "../../middlewares/validateRequest";
import AppError from "../../errorHelpers/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { Role } from "./user.interface";
import { envVars } from "../config/env";

const router = Router()
const checkAuth = (...authRoles:string[]) => (req: Request, res: Response, next: NextFunction) => {
      try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                  throw new AppError(403, "No token recived", "")
            }
            const varifiedToken = jwt.verify(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

            // console.log(varifiedToken);
            if (!authRoles.includes(varifiedToken.role)) {
                  throw new AppError(403, 'You are not permitted to view this route', "")
            }

            next()
      } catch (error) {
            next(error)
      }
}

router.post('/register', validateRequest(createUserZodSchema), UserControlers.createUserWithCredentials);
router.post('/google-register', validateRequest(createGoogleUserZodSchema), UserControlers.createUserWithGoogle);
router.get('/all-users',checkAuth('ADMIN','SUPER_ADMIN'), UserControlers.getAllUser)
export const UserRoutes = router; 