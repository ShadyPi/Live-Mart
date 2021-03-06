const express = require('express')
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const keys = require('./config/authKeys')
const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

require('./models/User')
require('./services/passport')

const addToCart = require('./services/addToCartService')
const Checkout = require('./services/userHistory')
const signup = require('./routes/signUp')
const signIn = require('./routes/signIn')

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

const PORT = 5000

mongoose.set('useFindAndModify', false)

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(cookieParser())

authRoutes(app)
addToCart(app)
signIn(app)
signup(app)
Checkout(app)

app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
