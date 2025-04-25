import { port } from "./config.js"
import express, { Application } from "express"

import { TaskController } from "./controllers/TaskController"
import { TaskRepository } from "./repositories/TaskRepository.js"
import { TaskService } from "./services/TaskService"

const app: Application = express()
app.use(express.json())

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

app.delete("/tasks", taskController.deleteTask)
app.get("/tasks", taskController.getAllTasks)
app.get("/tasks/:id", taskController.getTaskById)
app.post("/tasks", taskController.createTask)
app.put("/tasks/:id", taskController.updateTask)

app.listen(port, () => console.log(`Server listening on port ${port}`))
