import express from "express"
import { createBooking } from "../controller/BookingController.js";

const router = express.Router();

router.post('/booking', createBooking)

export default router;
