import { Request, Response } from "express";
import itemService from "../services/item.service";
import { ItemBody } from "../common/types";

const itemController = {
  async getItems(req: Request, res: Response) {
    try {
      const items = await itemService.getItems();
      return res.json(items);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async createItem(req: Request<ItemBody>, res: Response) {
    try {
      const { title, description, quantity } = req.body;
      await itemService.createItem(title, description, quantity);
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await itemService.updateItem(Number(id), req.body);
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await itemService.deleteItem(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};

export default itemController;
