import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import projectRouter from './project.routes';
import userProjectRouter from './user-project.routes'
import sprintRouter from './sprint.routes';
import storyRouter from './story.routes';
import taskRouter from './task.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/user-project', userProjectRouter);
router.use('/sprint', sprintRouter);
router.use('/story', storyRouter);
router.use('/task', taskRouter);

export default router;