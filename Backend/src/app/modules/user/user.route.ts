import { Router } from "express";
import { UserControlers } from "./user.controller";

const router = Router()

router.post('/register',UserControlers.createUser)

 export const UserRoutes = router;