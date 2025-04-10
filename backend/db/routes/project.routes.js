import {Router } from 'express';
import {body} from 'express-validator'
import * as projectController from '../controllers/project.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js';
const router=Router();

router.post('/create',authMiddleware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
  
)

router.get('/all',authMiddleware.authUser,projectController.getAllProjects)

router.put('/add-user',authMiddleware.authUser,
    body('projectId').isString().withMessage('projectId is required'),
    body('users').isArray({min:1}).withMessage('users must be an array of strings').bail()

    .custom((users)=>users.every(user=>typeof user==='string')).withMessage('each user must be an array of strings'),
    projectController.addUserToProject)

    router.get('/get-project/:projectId',authMiddleware.authUser,projectController.getProjectById)
    router.put('/update-file-tree',authMiddleware.authUser,
    body('projectId').isString().withMessage('projectId is required'),
    body('fileTree').isObject().withMessage('fileTree must be an object'),
    projectController.updateFileTree)



export default router;