const register = (req, res) => {
  res.send('Register')
}

const login = (req, res) => {
  res.send('Login')
}

const logout = (req, res) => {
  res.send('Logout')
}

module.exports = { register, login, logout }
