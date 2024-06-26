import express from 'express';
import * as validationMiddleware from '../middlewares/validations.middleware.js';
import * as userMiddleware from '../middlewares/user.middleware.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as userController from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.use(authMiddleware.protect);
router.get('/', userController.findAll);
router
  .use('/:id', userMiddleware.validExistUser)
  .route('/:id')
  .patch(validationMiddleware.updateUser, userController.update)
  .delete(userController.deleteUser)
  .get(userMiddleware.validExistUser, userController.findOne);

const usersRouter = router;

export { usersRouter };
