import { v4 as uuid } from "uuid"
import { Task } from "../models/TaskModel"

export class TaskRepository {
  private tasks: Task[] = []

  async createTask(task: Pick<Task, "description">): Promise<Task> {
    const newTask: Task = {
      id: uuid(),
      description: task.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.tasks.push(newTask)

    return newTask
  }

  async deleteTask(id: string): Promise<boolean> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id)
    if (!taskIndex) return false

    this.tasks.splice(taskIndex, 1)

    return true
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find((t) => t.id === id)
    return task
  }

  async updateTask(
    id: string,
    updatedData: Partial<Pick<Task, "description" | "completed">>
  ): Promise<Task | undefined> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) return undefined

    const newTask = this.tasks[taskIndex]
    if (updatedData.description !== undefined)
      newTask.description = updatedData.description
    if (updatedData.completed !== undefined)
      newTask.completed = updatedData.completed

    newTask.updatedAt = new Date().toISOString()

    return newTask
  }
}
