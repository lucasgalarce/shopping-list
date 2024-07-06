import { Request, Response } from "express";
import taskService from "../services/task.service";
import { Status, TaskBody } from "../common/types";

const taskController = {
  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await taskService.getTasks();
      return res.json(tasks);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async createTask(req: Request<TaskBody>, res: Response) {
    try {
      const { title, description, status } = req.body;
      if (!Object.values(Status).includes(status))
        return res.status(400).json({ message: "Invalid status" });

      await taskService.createTask(title, description, status);
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await taskService.updateTask(Number(id), req.body);
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};

export default taskController;
