import { DataTypes } from "sequelize";
import { db } from "../database/config.js";

const Ots = db.define("ots", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ot_mano: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  counter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clac: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  materials: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { Ots };
