import { Router } from "express";
import { UserControlers } from "./user.controller";
import { createUserZodSchema } from './user.validation';
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router()

router.post('/register', validateRequest(createUserZodSchema), UserControlers.createUser);
router.get('/all-users', UserControlers.getAllUser)
export const UserRoutes = router; 