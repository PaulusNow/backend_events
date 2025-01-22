import express from "express"
import { DeleteUser, getUser, getUserById, Login, Logout, Register, UpdateUser } from "../controller/UserController.js";
import { VerifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/users', VerifyToken, getUser);
router.get('/users/:id', getUserById);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.patch('/users/:id', UpdateUser);
router.delete('/users/:id', DeleteUser);

export default router;