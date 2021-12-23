const Project = require('../models/project')

/**
 * @swagger
 * /projects:
 *  get:
 *    summary: Get all projects
 *    tags:
 *      - Projects
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.getAll = async (req, res) => {
  try {
    //get the projects from projects collection and populate users
    const projects = await Project.find({}).populate('users')
    return res.status(200).send({ success: true, data: projects })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /projects/{id}:
 *  get:
 *    summary: Get a project by id
 *    tags:
 *      - Projects
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        description: unique Id of the project
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.getById = async (req, res) => {
  try {
    //get the project from projects collection by id and populate users
    const project = await Project.findOne({ id: req.params.id }).populate('users')
    if (!project) return res.status(404).send({ success: false, error: 'Project not found' })
    return res.status(200).send({ success: true, data: project })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /projects:
 *  post:
 *    summary: Create a new project
 *    tags:
 *      - Projects
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              {name: ums,id: 1}
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.create = async (req, res) => {
  try {
    //create a new project using the body passed in POST method
    await Project.create(req.body)
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /projects/{id}:
 *  put:
 *    summary: Update a project by id
 *    tags:
 *      - Projects
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        description: unique Id of the project
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              {name: ums}
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.update = async (req, res) => {
  try {
    //find a project first by id which needs to be updated
    const project = await Project.findOne({ id: req.params.id })
    if (!project) return res.status(404).send({ success: false, error: 'Project not found' })
    //if project exists in db, then update its keys and save the project object to db
    if (req.body.name) project.name = req.body.name
    if (req.body.users) project.users = req.body.users
    await project.save()
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /projects/{id}:
 *  delete:
 *    summary: Delete a project by id
 *    tags:
 *      - Projects
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        description: unique Id of the project
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.delete = async (req, res) => {
  try {
    //delete a project by id
    await Project.deleteOne({ id: req.params.id })
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}
