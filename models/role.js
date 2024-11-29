import connection from "../configs/dbConnect.js";
import { Sequelize, Model } from "sequelize";

const Role = connection.define(
  "role",
  {
    role_id: {
      type: Sequelize.INTEGER,

      autoIncrement: true,

      allowNull: false,

      primaryKey: true,
    },

    name: { type: Sequelize.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);
export default Role;
