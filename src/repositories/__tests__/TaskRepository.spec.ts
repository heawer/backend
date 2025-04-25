import { TaskRepository } from "../TaskRepository";
import { v4 as uuid } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn()
}))

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;
  let mockUuidCounter: number;

  beforeEach(() => {
    taskRepository = new TaskRepository();
    mockUuidCounter = 1;
    (uuid as jest.Mock).mockImplementation(() => `test-uuid-${mockUuidCounter++}`);
  });

  it('should create a new task with correct defaults', async () => {
    const description = "Test Task";
    const task = await taskRepository.createTask({ description });

    expect(task).toBeDefined();
    expect(task.id).toBe('test-uuid-1');
    expect(task.description).toBe(description);
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();
  })

  it('should return all tasks', async () => {
    const task1 = await taskRepository.createTask({ description: "Task 1" });
    const task2 = await taskRepository.createTask({ description: "Task 2" })

    const tasks = await taskRepository.getAllTasks();

    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual(task1);
    expect(tasks[1]).toEqual(task2);
    expect(tasks[0]).not.toBe(task2);
  })

  it('should get a task by its ID', async () => {
    const createdTask = await taskRepository.createTask({ description: "Test" });
    const foundTask = await taskRepository.getTaskById(createdTask.id);

    expect(foundTask).toBeDefined();
    expect(foundTask).toEqual(createdTask);
  })
})