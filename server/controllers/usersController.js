const User = require('../models/User')
const bcrypt = require('bcrypt')

// @desc Create new user
// @route POST /users
const createUser = async (req, res) => {
  const { username, password } = req.body

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10)
  const userObject = { username, "password": hashedPwd, refreshToken: '' }

  // Create and store new user 
  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }
}

// @desc Update a user
// @route PATCH /users
const updateUser = async (req, res) => {
  const { _id: id, username, password } = req.body

  // Confirm data 
  if (!id || !username) {
    return res.status(400).json({ message: 'All fields except password are required' })
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  // Check for duplicate 
  const duplicate = await User.findOne({ username }).lean().exec()

  // Allow updates to the original user 
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  user.username = username

  if (password) {
    // Hash password 
    user.password = await bcrypt.hash(password, 10)
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated` })
}

module.exports = {
  createUser,
  updateUser,
}