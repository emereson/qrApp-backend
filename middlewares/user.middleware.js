import { Batteries } from '../models/batteries.model.js';
import { Ots } from '../models/ots.model.js';
import { TypesCounter } from '../models/typesCounter.model.js';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      { model: Ots },
      { model: Batteries, include: [{ model: TypesCounter }] },
    ],
  });

  if (!user) {
    return next(new AppError(`User with id: ${id} not found`, 404));
  }

  req.user = user;
  next();
});
