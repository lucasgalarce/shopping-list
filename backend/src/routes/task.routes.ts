import taskController from "../controllers/task.controller";

export default (router) => {
  router.get("/tasks", taskController.getTasks);
  router.post("/tasks", taskController.createTask);
  router.delete("/tasks/:id", taskController.deleteTask);
  router.put("/tasks/:id", taskController.updateTask);
};
