import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const TypesCounter = db.define('typesCounter', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  battery_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  counter_code: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
  },
  counter_state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
  },
});

export { TypesCounter };
