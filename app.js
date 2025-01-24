import express from "express";
import http from "http";
import { Server } from "socket.io";

import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import db from "./config/database.js";
import Eventsrouter from "./routes/EventsRoute.js";
import UsersRouter from "./routes/UsersRoute.js";
import BookingRouter from "./routes/BookingRoute.js";
import Event from "./models/EventModel.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Membuat server HTTP
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Sesuaikan dengan origin frontend Anda
        methods: ["GET", "POST"],
    },
});

// Tes koneksi database
try {
    await db.authenticate();
    console.log("Database Connected...");
} catch (error) {
    console.error("Database connection error:", error);
}

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use( Eventsrouter, UsersRouter, BookingRouter);

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

        // Emit perubahan tiket ke semua klien
        io.emit("ticketUpdated", { eventId, ticketsAvailable: event.ticketsAvailable });

        res.status(200).json({ message: "Booking berhasil!" });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat melakukan booking" });
    }
});

// Event listener untuk Socket.io
io.on("connection", (socket) => {
    console.log(`A client connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`A client disconnected: ${socket.id}`);
    });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
