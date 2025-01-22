import Event from "../models/EventModel.js";

export const getEvent = async (req, res) => {
    try {
        const respons = await Event.findAll();
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
    // Ambil data dari body
    const { name, date, ticketsAvailable, price } = req.body;

    // Konversi format tanggal DD/MM/YYYY ke YYYY-MM-DD
    const formattedDate = date.split("/").reverse().join("-");

    // Simpan ke database
    await Event.create({
      name,
      date: formattedDate,
      ticketsAvailable,
      price,
    });

    res.status(201).json({ message: "Event Berhasil Ditambahkan" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Gagal menambahkan event." });
  }
};


export const UpdateEvent = async (req, res) => {
    try {
        await Event.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Event Berhasil Diedit" })
    } catch (error) {
        console.log(error.message)
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