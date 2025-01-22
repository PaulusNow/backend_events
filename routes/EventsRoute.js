import express from "express"
import { getEvent, getEventById, createEvent, UpdateEvent, DeleteEvent } from "../controller/EventController.js";

const router = express.Router();

router.get('/event', getEvent);
router.get('/event/:id', getEventById);
router.post('/event', createEvent);
router.patch('/event/:id', UpdateEvent);
router.delete('/event/:id', DeleteEvent);

export default router;
