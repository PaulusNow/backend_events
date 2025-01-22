import express from "express"
import cors from "cors"
import db from "./config/database.js"
import Eventsrouter from "./routes/EventsRoute.js";
import UsersRouter from "./routes/UsersRoute.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();

try {
  await db.authenticate();
  console.log('Database Connected...')
} catch (error) {
  console.error(error)
}


const app = express();
const PORT = process.env.PORT;  

app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
app.use(cookieParser())
app.use(express.json());
app.use(Eventsrouter, UsersRouter);


app.listen(PORT, () => {
  console.log(`Server berjalan di ${PORT}`);
});
