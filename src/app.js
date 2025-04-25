import express from 'express'
import { v4 as uuid } from 'uuid' 

const app = express()
const port = 3000

const tasks = []

app.use(express.json())

app.get('/', (req, res) => res.send('Hello, world!'))

app.get('/tasks', (req, res) => {
  return res.json({ tasks })
})

app.post('/tasks', (req, res) => {
  const { description } = req.body

  if (!description || typeof description !== 'string') {
    return res.status(400).json({
      message: 'Description is required'
    })
  }

  const newTask = {
    id: uuid(),
    description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  tasks.push(newTask)

  console.log('Task created', newTask)

  return res.json({
    message: 'Task created successfully',
    tasks
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))