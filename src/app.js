import express from 'express'
import { v4 as uuid } from 'uuid'
import { port } from './config.js'

const app = express()
app.use(express.json())

const tasks = []

app.get('/tasks', (req, res) => {
  return res.json({ tasks })
})

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  const task = tasks.find(t => t.id === id)

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  return res.json({ task })
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

  return res.json({
    message: 'Task created successfully',
    tasks
  })
})

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params
  const taskIndex = tasks.findIndex(t => t.id === id)

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  if (!req.body) {
    return res.status(200).json({
      message: "You must include a body"
    })
  }

  const { description, completed } = req.body

  if (description !== undefined) tasks[taskIndex].description = description
  if (completed !== undefined) tasks[taskIndex].completed = completed
  tasks[taskIndex].updatedAt = new Date()

  return res.json({
    message: "Task updated successfully",
    task: tasks[taskIndex]
  })
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params
  const taskIndex = tasks.findIndex(t => t.id === id)

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  tasks.splice(taskIndex, 1)

  return res.status(204).send()
})

app.listen(port, () => console.log(`Server listening on port ${port}`))