const User = require('../models/user')

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    tags:
 *      - Users
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.getAll = async (req, res) => {
  try {
    //get all the users object from db from users collection
    const users = await User.find({})
    return res.status(200).send({ success: true, data: users })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get a user by id
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        description: unique Id of the user
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.getById = async (req, res) => {
  try {
    //get a user by id. Id is picked from request URL
    const user = await User.findOne({ id: req.params.id })
    //if user not found in db, then send 404 error.
    if (!user) return res.status(404).send({ success: false, error: 'User not found' })
    return res.status(200).send({ success: true, data: user })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              {name: sam,id: 1}
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.create = async (req, res) => {
  try {
    //create a user based on the data in req.body POST method.
    await User.create(req.body)
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update a user by id
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        description: unique Id of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              {name: tom}
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.update = async (req, res) => {
  try {
    //update a user by userId. First find a user with the provided id. If not found, send 404 error.
    const user = await User.findOne({ id: req.params.id })
    if (!user) return res.status(404).send({ success: false, error: 'User not found' })

    if (req.body.name) user.name = req.body.name
    await user.save()
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Delete a user by id
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        description: unique Id of the user
 *    responses:
 *      '200':
 *        description: Successful response
 */
module.exports.delete = async (req, res) => {
  try {
    //delete a user by id.
    await User.deleteOne({ id: req.params.id })
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message})
  }
}
