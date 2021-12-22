const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projects')
const userController = require('../controllers/users')

// project routes
router.get('/projects/:id', projectController.getById)
router.put('/projects/:id', projectController.update)
router.delete('/projects/:id', projectController.delete)
router.get('/projects', projectController.getAll)
router.post('/projects', projectController.create)

// user routes
router.get('/users/:id', userController.getById)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)
router.get('/users', userController.getAll)
router.post('/users', userController.create)

module.exports = router
