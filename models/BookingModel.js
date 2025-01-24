import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Event from "./EventModel.js";

const { DataTypes } = Sequelize;

const Booking = db.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  freezeTableName: true,
});

Users.belongsToMany(Event, { through: Booking, foreignKey: "userId" });
Event.belongsToMany(Users, { through: Booking, foreignKey: "eventId" });

export default Booking;

(async () => {
  await db.sync();
})();
