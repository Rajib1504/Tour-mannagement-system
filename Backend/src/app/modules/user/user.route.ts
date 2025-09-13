import { Router } from "express";
import { UserControlers } from "./user.controller";

const router = Router()

router.post('/register', UserControlers.createUser)
router.get('/all-users', UserControlers.getAllUser)
export const UserRoutes = router;