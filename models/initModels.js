import { Ots } from "./ots.model.js";
import { TypesOfAction } from "./typesOfAction.model.js";

const initModel = () => {
  Ots.hasMany(TypesOfAction, { foreignKey: "ot_id" });
  TypesOfAction.belongsTo(Ots, { foreignKey: "ot_id" });
};

export { initModel };
