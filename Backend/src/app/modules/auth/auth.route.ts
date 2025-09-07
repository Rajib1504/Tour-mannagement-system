import { Router } from "express";
import { AuthControlers } from "./auth.controller";

const router = Router();

router.post('/login',AuthControlers.credentialLogin)

export const AuthRoutes = router;