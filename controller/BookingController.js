import { io } from '../app.js'; // Pastikan path sesuai dengan lokasi app.js kamu
import Booking from '../models/BookingModel.js';
import Event from '../models/EventModel.js'; // Pastikan path-nya sesuai

export const createBooking = async (req, res) => {
  try {
    const { eventId, userId, quantity } = req.body;

    // Cek apakah event tersedia
    const event = await Event.findByPk(eventId); // Pastikan ini benar
    if (!event) {
      return res.status(404).json({ error: "Event tidak ditemukan" });
    }

    if (event.ticketAvailable < quantity) {
      return res.status(400).json({ error: "Tiket tidak cukup tersedia" });
    }

    // Buat booking baru
    const bookingData = {
      eventId,
      userId,
      quantity,
    };
    const newBooking = await Booking.create(bookingData);

    // Kurangi ticketAvailable di tabel Event
    await event.update({
      ticketsAvailable: event.ticketsAvailable - quantity
    });

    // Emit event untuk memberi tahu klien
    io.emit('bookingUpdated', { message: 'A new booking has been made', booking: newBooking });

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create booking' });
  }
};
