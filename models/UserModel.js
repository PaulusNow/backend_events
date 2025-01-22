import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refresh_token:{
      type:DataTypes.TEXT
    },
    is_admin: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
  },
  {
    freezeTableName: true,
  }
);

export default Users;

(async () => {
  await db.sync();
})();