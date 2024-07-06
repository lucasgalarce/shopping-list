import { Status } from "../common/types";
import { Task } from "../entities/Task";

const taskService = {
  async getTasks() {
    const tasks = await Task.find();
    return tasks;
  },

  async createTask(title: string, description: string, status: Status) {
    console.log("createTask");
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = status;

    return task.save();
  },

  async updateTask(id: number, payload) {
    const task = await Task.findOneBy({ id });
    if (!task) throw new Error("Invalid id");
    const result = await Task.update({ id }, payload);
    if (result.affected === 0) throw new Error("Error");

    return;
  },

  async deleteTask(id: number) {
    const result = await Task.delete({ id });
    if (result.affected === 0) throw new Error("Invalid id");
    return result;
  },
};

export default taskService;
