import { Ots } from "../models/ots.model.js";
import { TypesOfAction } from "../models/typesOfAction.model.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const validExistOts = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const ot = await Ots.findOne({
    where: {
      ot_mano: id,
    },
    include: {
      model: TypesOfAction,
    },
  });

  if (!ot) {
    return next(new AppError(`ot with id: ${id} not found `, 404));
  }

  req.ot = ot;
  next();
});
