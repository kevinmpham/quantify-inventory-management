const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  const access = process.env.ACCESS_TOKEN_SECRET;
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized 
  // evaluate password 
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        "username": foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    res.json({ username: foundUser.username, accessToken })

  } else {
    res.sendStatus(401);
  }
}

const handleLogout = async (req, res) => {
  const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
  }
}

module.exports = { handleLogin, handleLogout };