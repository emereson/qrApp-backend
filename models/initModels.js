import { Batteries } from './batteries.model.js';
import { Ots } from './ots.model.js';
import { TypesCounter } from './typesCounter.model.js';
import { TypesOfAction } from './typesOfAction.model.js';
import { User } from './user.model.js';

const initModel = () => {
  User.hasMany(Batteries, { foreignKey: 'user_id' });
  Batteries.belongsTo(User, { foreignKey: 'user_id' });

  User.hasMany(Ots, { foreignKey: 'user_id' });
  Ots.belongsTo(User, { foreignKey: 'user_id' });

  Ots.hasMany(TypesOfAction, { foreignKey: 'ot_id' });
  TypesOfAction.belongsTo(Ots, { foreignKey: 'ot_id' });

  Batteries.hasMany(TypesCounter, { foreignKey: 'battery_id' });
  TypesCounter.belongsTo(Batteries, { foreignKey: 'battery_id' });
};

export { initModel };
