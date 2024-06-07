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
  });

  if (!user) {
    return next(new AppError(`user with id: ${id} not found `, 404));
  }

  req.user = user;
  next();
});
