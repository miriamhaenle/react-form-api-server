import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/User'
import { accessToken } from './config'

const server = express()
server.use(express.json())
server.use(cors())

mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

server.get('/', (req, res) => {
  res.json({ status: 'alive and awake' })
})

server.get('/users', (req, res) => {
  const accessTokenFromClient = req.query.accessToken
  if (accessTokenFromClient === accessToken) {
    User.find().then((users) => res.json(users))
  } else {
    res.status(401).json({ error: 'No valid access token provided.' })
  }
})

server.post('/users', (req, res) => {
  const newUser = req.body
  User.create(newUser)
    .then((data) => res.json(data))
    .catch((error) => console.log(error))
})

server.patch('/users/:id', (req, res) => {
  const { id } = req.params
  const updatedUser = req.body

  User.findByIdAndUpdate({ _id: id }, updatedUser, {
    new: true,
    overwrite: true,
  })
    .then((user) => res.json(user))
    .catch((error) => {
      console.error(error.message)
      res.send('An unexpected errror occured')
    })
})

server.delete('/users/:id', (req, res) => {
  const { id } = req.params

  User.findByIdAndDelete({ _id: id }).then((data) => res.json(data))
})

const port = 4000
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
