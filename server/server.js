const express = require('express')
const apiRouter = require('./routes/apiRouter')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

function start() {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  // connect to mongo db
  mongoose.connect(
    'mongodb+srv://gurusoft:jyuS4J1obK2U8KPQ@cluster0-fpfsx.mongodb.net/squareparty?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )

  const whitelist = ['http://localhost:3000', 'https://squareparty.netlify.app']
  const corsOptions = {
    origin: whitelist,
    credentials: true,
  }
  app.use(cors(corsOptions))
  app.use('/api', apiRouter)
  app.use(express.static('./build/'))
  app.get('*', function (req, res) {
    res.sendFile(path.resolve('build', 'index.html'))
  })

  app.listen(process.env.PORT || 5000, () =>
    console.log('token server running on 5000'),
  )
}

module.exports.start = start
