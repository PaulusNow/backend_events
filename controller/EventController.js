import Event from "../models/EventModel.js";

export const getEvent = async (req, res) => {
    try {
        const respons = await Event.findAll({
            attributes: ['id', 'name', 'date', 'location', 'description', 'ticketsAvailable']
        });
        res.status(200).json(respons)
    } catch (error) {
        console.log(error.message)
    }
}

export const getEventById = async (req, res) => {
    try {
        const respons = await Event.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(respons)
    } catch (error) {
        console.log(error.message)
    }
}

export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description, ticketsAvailable } = req.body;

    // Konversi format tanggal DD/MM/YYYY ke YYYY-MM-DD
    const formattedDate = date.split("/").reverse().join("-");

    // Simpan ke database
    await Event.create({
      name,
      date: formattedDate,
      location,
      description,
      ticketsAvailable,
    });

    res.status(201).json({ message: "Event Berhasil Ditambahkan" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Gagal menambahkan event." });
  }
};

export const UpdateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { name, date, location, description, ticketsAvailable } = req.body;

    if (!eventId) {
        return res.status(400).json({ message: 'Event ID tidak diketahui' });
    }

    if (!name && !date && !location && !description && !ticketsAvailable) {
        return res.status(400).json({ message: "Minimal isi 1 field untuk update." });
    }

    try {
        const event = await Event.findOne({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan." });
        }

        if (name) event.name = name;
        if (date) event.date = date;
        if (location) event.location = location;
        if (description) event.description = description;
        if (ticketsAvailable) event.ticketsAvailable = ticketsAvailable;

        await event.save();
        res.status(200).json({ message: "Event Berhasil Diedit" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const DeleteEvent = async (req, res) => {
    try {
        await Event.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ message: "Event Berhasil Dihapus" })
    } catch (error) {
        console.log(error.message)
    }
}