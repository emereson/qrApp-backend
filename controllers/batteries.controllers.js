import { catchAsync } from '../utils/catchAsync.js';
import { Batteries } from '../models/batteries.model.js';
import { TypesCounter } from '../models/typesCounter.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const batteries = await Batteries.findAll({});

  return res.status(200).json({
    status: 'Success',
    results: batteries.length,
    batteries,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { battery } = req;

  return res.status(200).json({
    status: 'Success',
    battery,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { ot_mano, materials, observations, arratTypeCounter } = req.body;

  const battery = await Batteries.create({
    user_id: id,
    ot_mano,
    materials,
    observations,
  });

  if (Array.isArray(arratTypeCounter)) {
    for (const item of arratTypeCounter) {
      const { counter_code, counter_state } = item; // Obtener valores de cada item
      await TypesCounter.create({
        battery_id: battery.id,
        counter_code,
        counter_state,
      });
    }
  }

  res.status(201).json({
    status: 'success',
    message: 'The ot has been created successfully!',
    battery,
  });
});

export const update = catchAsync(async (req, res) => {
  const { battery } = req;
  const { ot_mano, materials, observations } = req.body;

  await battery.update({
    ot_mano,
    materials,
    observations,
  });

  return res.status(200).json({
    status: 'success',
    message: 'battery information has been updated',
    battery,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { battery } = req;

  await battery.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The battery with id: ${battery.id} has been deleted`,
  });
});
