module.exports = {
  getAllProducts: async (req, res) => {
    const db = req.app.get('db')

    const products = await db.get_all_products()

    res.status(200).send(products)
  },
}
