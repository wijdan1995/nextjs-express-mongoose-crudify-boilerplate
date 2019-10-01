require('dotenv').config()

const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const glob = require('glob')
const next = require('next')

//i18n
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('../i18n')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const routes = require('./routes')
const routerHandler = routes.getRequestHandler(app)

const { config } = require('../config/config')

app.prepare().then(() => {
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }))
  // Parse application/json
  server.use(bodyParser.json())
  // server.use(nextI18NextMiddleware(nextI18next))
  // Allows for cross origin domain request:
  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  // MongoDB
  mongoose.Promise = Promise
  mongoose.connect(config.databaseUrl, { useMongoClient: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))

  // REST API routes
  const rootPath = require('path').join(__dirname, '/..')
  glob.sync(rootPath + '/server/api/*.js').forEach(controllerPath => {
    if (!controllerPath.includes('.test.js')) require(controllerPath)(server)
  })

  // Next.js page routes
  server.get('*', routerHandler)

  // Start server
  server.listen(config.serverPort, () => console.log(`${config.appName} running on http://localhost:${config.serverPort}/`))
})
