module.exports = {
  register: (req, res) => {
    /*
    TODO get db
    TODO destructure info (email, password, first_name, last_name)
    TODO check if user exists using email - if conflict, reject
    TODO generate salt
    TODO generate hash
    TODO insert user & hash
    TODO set user on session
    TODO send confirmation
    */
  },
  login: (req, res) => {
    /*
    TODO get db
    TODO destructure info (email, password)
    TODO check if user exists using email - if not found, reject
    TODO fetch hash
    TODO check hash against password - if mismatch, reject
    TODO get user info
    TODO set user on session
    TODO send confirmation
    */
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('User not found')
    }
  },
}
