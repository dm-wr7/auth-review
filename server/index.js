require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const productsCtrl = require('./controllers/products')
const cartCtrl = require('./controllers/cart')
const authCtrl = require('./controllers/auth')
const session = require('express-session')
const verifyUser = require('./middleware/verifyUser')
const verifyProduct = require('./middleware/verifyProduct')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
)

//* PRODUCTS
app.get('/api/products', productsCtrl.getAllProducts)

//* CART
app.post(
  '/api/users/:user_id/cart',
  verifyUser,
  verifyProduct,
  cartCtrl.addToCart
)

//* AUTH
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth', authCtrl.getUser)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log('db set')
  app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
