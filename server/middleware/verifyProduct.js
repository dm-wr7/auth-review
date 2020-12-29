module.exports = async (req, res, next) => {
  const db = req.app.get('db')
  const { product_id } = req.body

  const [product] = await db.products.find({ id: product_id })

  if (product) {
    next()
  } else {
    res.status(404).send('You can only add a valid product.')
  }
}
