import connection from "../configs/dbConnect.js";
import { Sequelize, Model } from "sequelize";

const User = connection.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER,

      autoIncrement: true,

      allowNull: false,

      primaryKey: true,
    },

    user_name: { type: Sequelize.STRING, allowNull: true },

    password: { type: Sequelize.STRING, allowNull: false },

    email: { type: Sequelize.STRING, allowNull: false },

    avatar: { type: Sequelize.STRING, allowNull: true },

    token: { type: Sequelize.STRING, allowNull: true },

    status: { type: Sequelize.INTEGER, allowNull: true },

    role_id: { type: Sequelize.INTEGER, allowNull: true },

    otp: { type: Sequelize.STRING, allowNull: true },

    otpExpires: { type: Sequelize.DATE, allowNull: true },
  },
  {
    timestamps: true,
  }
);
export default User;
