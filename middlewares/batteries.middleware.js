import { Batteries } from '../models/batteries.model.js';
import { TypesCounter } from '../models/typesCounter.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistBatty = catchAsync(async (req, res, next) => {
  const { id, userId } = req.params;

  const battery = await Batteries.findOne({
    where: {
      ot_mano: id,
      user_id: userId,
    },
    include: {
      model: TypesCounter,
    },
  });

  if (!battery) {
    return next(new AppError(`battery with id: ${id} nbattery found `, 404));
  }

  req.battery = battery;
  next();
});
