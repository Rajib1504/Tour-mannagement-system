import { Router } from "express";
import { UserControlers } from "./user.controller";
import { createUserZodSchema, createGoogleUserZodSchema } from './user.validation';
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router()

router.post('/register', validateRequest(createUserZodSchema), UserControlers.createUserWithCredentials);
router.post('/google-register', validateRequest(createGoogleUserZodSchema), UserControlers.createUserWithGoogle);
router.get('/all-users', UserControlers.getAllUser)
export const UserRoutes = router; 