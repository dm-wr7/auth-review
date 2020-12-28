module.exports = {
  addToCart: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const { product_id, quantity } = req.body

    const userCart = await db.user_cart.find({ user_id })

    const cartItem = userCart.find((e) => e.product_id === product_id)

    if (cartItem) {
      await db.user_cart.save({
        id: cartItem.id,
        quantity: cartItem.quantity + quantity,
      })
    } else {
      await db.user_cart.insert({ product_id, quantity, user_id })
    }

    res.sendStatus(200)
  },
}
