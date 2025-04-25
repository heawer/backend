import { TaskRepository } from "../repositories/TaskRepository"
import { Task } from "../models/TaskModel"

export class TaskService {
  private taskRepository: TaskRepository

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository
  }

  async deleteTask(id: string) {
    return await this.taskRepository.deleteTask(id)
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.getAllTasks()
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return await this.taskRepository.getTaskById(id)
  }

  async createTask(task: Pick<Task, "description">): Promise<Task> {
    if (!task.description) throw new Error("Description is required")

    return await this.taskRepository.createTask({
      description: task.description,
    })
  }

  async updateTask(
    id: string,
    updatedData: Partial<Pick<Task, "description" | "completed">>
  ) {
    return await this.taskRepository.updateTask(id, updatedData)
  }
}
