module.exports = (req, res, next) => {
  const { user_id } = req.params

  if (!req.session.user) {
    res.status(404).send('Not logged in')
  } else if (req.session.user.id !== +user_id) {
    res.status(403).send('You can only add to your own cart')
  } else {
    next()
  }
}
