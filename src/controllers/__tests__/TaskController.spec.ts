import { Request, Response } from "express"
import { Task } from "../../models/TaskModel"
import { TaskService } from "../../services/TaskService"
import { TaskController } from "../TaskController"
import { v4 as uuid } from "uuid"

jest.mock("../../services/TaskService")

const MockTaskService = TaskService as jest.MockedClass<typeof TaskService>

describe("TaskController", () => {
  let taskController: TaskController
  let mockServiceInstance: jest.Mocked<TaskService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  const sampleTask: Task = {
    id: 'task-1',
    description: 'Sample Task',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockServiceInstance = new MockTaskService(
      {} as any,
    ) as jest.Mocked<TaskService>
    taskController = new TaskController(mockServiceInstance)
    mockRequest = {
      body: {},
      params: {},
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    }
  })

  describe("createTask", () => {
    it("should create a task and return 201 status with the task", async () => {
      const taskData = { description: 'New task from controller' };
      const createdTask = { ...sampleTask, ...taskData, id: 'controller-task-id' }
      mockRequest.body = taskData;
      mockServiceInstance.createTask.mockResolvedValue(createdTask);

      await taskController.createTask(mockRequest as Request, mockResponse as Response)

      expect(mockServiceInstance.createTask).toHaveBeenCalledTimes(1)
      expect(mockServiceInstance.createTask).toHaveBeenCalledWith(taskData)
      expect(mockResponse.status).toHaveBeenCalledWith(201)
    })

    it("should return 500 if service throws an error", async () => {
      const error = new Error("Service failed")
      mockRequest.body = { description: "Will fail" }
      mockServiceInstance.createTask.mockRejectedValue(error)

      await taskController.createTask(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockServiceInstance.createTask).toHaveBeenCalledTimes(1)
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: error.message })

    })
  })
})
