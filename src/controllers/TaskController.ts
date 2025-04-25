import { Request, Response } from "express"
import { TaskService } from "../services/TaskService"
import { Task } from "../models/TaskModel"

export class TaskController {
  constructor(private taskService: TaskService) {
    this.taskService = taskService
  }

  createTask = async (req: Request, res: Response) => {
    const { description } = req.body

    try {
      const task = await this.taskService.createTask({ description })

      res.status(201).json({
        message: "Task created successfully",
        task,
      })
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message })
      console.error(err)
    }
  }

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const deleted = await this.taskService.deleteTask(id)

      if (!deleted)
        res.status(404).json({
          message: "Task not found",
        })

      res.status(204).send()
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message })
      console.error(err)
    }
  }

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks: Task[] = await this.taskService.getAllTasks()

      res.json(tasks)
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message })
      console.error(err)
    }
  }

  getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const task = await this.taskService.getTaskById(id)

      if (!task)
        res.status(404).json({
          message: "Task not found",
        })

      res.json({ task })
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message })
      console.error(err)
    }
  }

  updateTask = async (req: Request, res: Response) => {
    const { id } = req.params

    const updatedData = req.body

    if (!updatedData)
      res.status(400).json({
        message: "Request body cannot be empty",
      })

    try {
      const updatedTask = await this.taskService.updateTask(id, updatedData)

      if (!updatedTask)
        res.status(404).json({
          message: "Task not found",
        })

      res.json({
        message: "Task updated successfully",
        updatedTask,
      })
    } catch (err) {
      if (err instanceof Error) res.status(500).json({ message: err.message })
      console.error(err)
    }
  }
}
