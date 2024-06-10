import { User } from '../models/user.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwt.js';

export const findAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    users,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const { name, last_name, user_name, dni, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(dni, salt);

  const user = await User.create({
    name,
    last_name,
    user_name,
    dni,
    role,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'the user has been created successfully!',
    token,
    user: {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
      dni: user.dni,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { user_name, password } = req.body;

  const user = await User.findOne({
    where: {
      user_name,
      status: 'active',
    },
  });
  if (!user) {
    return next(new AppError('El usuario no se encuentra registrado', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Contraseña incorrecta', 401));
  }

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
      role: user.role,
    },
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'User information has been updated',
    user,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id} has been deleted`,
  });
});
