import express from "express";
import http from "http";

import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import db from "./config/database.js";
import Eventsrouter from "./routes/EventsRoute.js";
import UsersRouter from "./routes/UsersRoute.js";
import BookingRouter from "./routes/BookingRoute.js";
import Event from "./models/EventModel.js";

dotenv.config();

try {
    await db.authenticate();
    console.log("Database Connected..");
} catch (error) {
    console.error(error);
}

const app = express();
const server = http.createServer(app); // Membuat server HTTP

// Middleware CORS
const corsOptions = {
    origin: "https://frontend-events-kappa.vercel.app", // Ganti dengan domain frontend Anda
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", corsOptions.origin);
        res.header("Access-Control-Allow-Methods", corsOptions.methods);
        res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders);
        return res.status(200).send(); // Response preflight
    }
    next();
});

// Middleware lainnya
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/events", Eventsrouter);
app.use("/users", UsersRouter);
app.use("/bookings", BookingRouter);

// POST untuk booking dan update tiket
app.post("/booking", async (req, res) => {
    try {
        const { eventId, userId, quantity } = req.body;

        // Cari event berdasarkan ID
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        // Cek apakah tiket tersedia
        if (event.ticketsAvailable < quantity) {
            return res.status(400).json({ message: "Tiket tidak cukup" });
        }

        // Update jumlah tiket yang tersedia
        event.ticketsAvailable -= quantity;
        await event.save();

        res.status(200).json({ message: "Booking berhasil!" });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat melakukan booking" });
    }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
