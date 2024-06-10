import { catchAsync } from '../utils/catchAsync.js';
import { Ots } from '../models/ots.model.js';
import { TypesOfAction } from '../models/typesOfAction.model.js';
export const findAll = catchAsync(async (req, res, next) => {
  const ots = await Ots.findAll({});

  return res.status(200).json({
    status: 'Success',
    results: ots.length,
    ots,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { ot } = req;

  return res.status(200).json({
    status: 'Success',
    ot,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const {
    ot_mano,
    counter,
    clac,
    materials,
    observations,
    soloContador,
    parcial,
    instPEConexInterior,
    bateria,
    incidencia,
    instClac,
    otros,
    completo,
  } = req.body;

  const ot = await Ots.create({
    user_id: id,
    ot_mano,
    counter,
    clac,
    materials,
    observations,
  });

  const typeOfAction = await TypesOfAction.create({
    ot_id: ot.id,
    soloContador,
    parcial,
    instPEConexInterior,
    bateria,
    incidencia,
    instClac,
    otros,
    completo,
  });

  res.status(201).json({
    status: 'success',
    message: 'the ot has been created successfully!',
    ot,
    typeOfAction,
  });
});

export const update = catchAsync(async (req, res) => {
  const { ot } = req;
  const {
    ot_mano,
    counter,
    clac,
    authentication_type,
    materials,
    observations,
  } = req.body;

  await ot.update({
    ot_mano,
    counter,
    clac,
    authentication_type,
    materials,
    observations,
  });

  return res.status(200).json({
    status: 'success',
    message: 'ot information has been updated',
    ot,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { ot } = req;

  await ot.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The ot with id: ${ot.id} has been deleted`,
  });
});
