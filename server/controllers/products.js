module.exports = {
  getAllProducts: async (req, res) => {
    const db = req.app.get('db')

    const products = await db.get_all_products()

    // const productsWithImages = products.map((product) => {
    //   db.get_product_images(product.id).then((images) => {
    //     return { ...product, images: images }
    //   })
    // })

    res.status(200).send(products)
  },
}
