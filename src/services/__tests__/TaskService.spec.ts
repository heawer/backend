import { Request, Response } from "express"
import { Task } from "../../models/TaskModel"
import { TaskService } from "../../services/TaskService"
import { TaskRepository } from "../../repositories/TaskRepository"
import { v4 as uuid } from "uuid"
import { EventEmitter } from "events"

jest.mock("../../repositories/TaskRepository")

const MockTaskRepository = TaskRepository as jest.MockedClass<
  typeof TaskRepository
>

describe("TaskService", () => {
  let taskService: TaskService
  let mockRepositoryInstance: jest.Mocked<TaskRepository>

  const sampleTask: Task = {
    id: "task-1",
    description: "Sample Task",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockRepositoryInstance = new MockTaskRepository() as jest.Mocked<TaskRepository>
    taskService = new TaskService(mockRepositoryInstance)
  })

  it("should get all the tasks", async () => {
    const tasks = [sampleTask, { ...sampleTask, id: 'task-2', description: 'Another Task' }];
    mockRepositoryInstance.getAllTasks.mockResolvedValue(tasks);

    const result = await taskService.getAllTasks();

    expect(mockRepositoryInstance.getAllTasks).toHaveBeenCalledTimes(1)
    expect(result).toEqual(tasks)
  })

  it("should get all the tasks", async () => {
    const taskData = { description: "New task from controller" }
    mockRepositoryInstance.createTask.mockResolvedValue({
      ...sampleTask,
      ...taskData,
      id: "new-task-id",
    })

    const result = await taskService.createTask(taskData)

    expect(mockRepositoryInstance.createTask).toHaveBeenCalledTimes(1)
    expect(mockRepositoryInstance.createTask).toHaveBeenCalledWith(taskData)
    expect(result).toBeDefined()
    expect(result.description).toBe(taskData.description)
  })

})
