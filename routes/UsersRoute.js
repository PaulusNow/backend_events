import express from "express"
import { DeleteUser, getUser, getUserById, Login, Logout, Register, updateUser } from "../controller/UserController.js";
import { VerifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

// router.get('/users', VerifyToken, getUser);
router.get('/users', getUser);
// router.get('/users/:id', VerifyToken, getUserById);
router.get('/users/:id', getUserById);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
// router.put('/users/:id', VerifyToken, updateUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', DeleteUser);

export default router;