import {  Router } from "express";
import { UserControlers } from "./user.controller";
import { createUserZodSchema, createGoogleUserZodSchema, updateZodSchema } from './user.validation';
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router()


router.post('/register', validateRequest(createUserZodSchema), UserControlers.createUserWithCredentials);
router.post('/google-register', validateRequest(createGoogleUserZodSchema), UserControlers.createUserWithGoogle);
router.patch('/:id',checkAuth(...Object.values(Role)),UserControlers.UpdateUser)
//api/v1/user/:id
router.get('/all-users',validateRequest(updateZodSchema),checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControlers.getAllUser)
export const UserRoutes = router; 