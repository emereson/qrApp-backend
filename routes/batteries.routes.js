import express from 'express';

import * as batteriesMiddleware from '../middlewares/batteries.middleware.js';
import * as batteriesController from '../controllers/batteries.controllers.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as userMiddleware from '../middlewares/user.middleware.js';

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/', batteriesController.findAll);
router.post('/:id', userMiddleware.validExistUser, batteriesController.create);
router.get(
  '/:id/user/:userId',
  batteriesMiddleware.validExistBatty,
  batteriesController.findOne
);

router
  .route('/:id')
  .get(batteriesMiddleware.validExistBatty, batteriesController.findOne)
  .patch(batteriesMiddleware.validExistBatty, batteriesController.update)
  .delete(
    batteriesMiddleware.validExistBatty,
    batteriesController.deleteElement
  );

const batteriesRouter = router;

export { batteriesRouter };
