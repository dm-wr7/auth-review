const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    /*
    //TODO get db
    //TODO destructure info (email, password, first_name, last_name)
    //TODO check if user exists using email - if conflict, reject
    //TODO generate salt
    //TODO generate hash
    //TODO insert user & hash
    //TODO set user on session
    //TODO send confirmation
    */

    const db = req.app.get('db')
    const { first_name, last_name, email, password } = req.body

    const [existingUser] = await db.users.find({ email })

    if (existingUser) {
      return res.status(409).send('user already exists')
    }

    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.users.insert({ first_name, last_name, email })

    await db.users_auth.insert({ user_id: newUser.id, hash })

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    /*
    //TODO get db
    //TODO destructure info (email, password)
    //TODO check if user exists using email - if not found, reject
    //TODO fetch hash
    //TODO check hash against password - if mismatch, reject
    //TODO get user info
    //TODO set user on session
    //TODO send confirmation
    */

    const db = req.app.get('db')
    const { email, password } = req.body

    const [existingUser] = await db.users.find({ email })

    if (!existingUser) {
      return res.status(404).send('User not found')
    }

    const [userAuth] = await db.users_auth.find({ user_id: existingUser.id })

    const isAuthenticated = bcrypt.compareSync(password, userAuth.hash)

    if (!isAuthenticated) {
      return res.status(403).send('Nuh uh uh, you didnt say the magic word')
    }

    req.session.user = existingUser

    res.status(200).send(req.session.user)
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
