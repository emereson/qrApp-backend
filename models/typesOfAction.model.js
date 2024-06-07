import { DataTypes } from "sequelize";
import { db } from "../database/config.js";

const TypesOfAction = db.define("typesOfAction", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  soloContador: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  completo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  parcial: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  instPEConexInterior: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  bateria: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  incidencia: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  instClac: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  otros: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export { TypesOfAction };
