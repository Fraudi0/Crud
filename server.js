const express = require('express')
const jsonServer = require('json-server')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults({ logger: true })

app.use('/api', middlewares, router)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT)
})
