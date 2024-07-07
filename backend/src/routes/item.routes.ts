import itemController from "../controllers/item.controller";

export default (router) => {
  router.get("/items", itemController.getItems);
  router.post("/items", itemController.createItem);
  router.delete("/items/:id", itemController.deleteItem);
  router.put("/items/:id", itemController.updateItem);
};
