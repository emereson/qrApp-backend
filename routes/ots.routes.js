import express from 'express';

import * as otsMiddleware from '../middlewares/ots.middleware.js';
import * as otsController from '../controllers/ots.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

import * as userMiddleware from '../middlewares/user.middleware.js';

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/', otsController.findAll);
router.post('/:id', userMiddleware.validExistUser, otsController.create);

router
  .route('/:id')
  .get(otsMiddleware.validExistOts, otsController.findOne)
  .patch(otsMiddleware.validExistOts, otsController.update)
  .delete(otsMiddleware.validExistOts, otsController.deleteElement);

const otsRouter = router;

export { otsRouter };
