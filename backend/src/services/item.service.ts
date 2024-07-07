import { FindManyOptions } from "typeorm";
import { Item } from "../entities/Item";

const itemService = {
  async getItems() {
    const options: FindManyOptions = {
      order: {
        createdAt: "ASC",
      },
    };
    const items = await Item.find(options);
    return items;
  },

  async createItem(title: string, description: string, quantity: number) {
    const item = new Item();

    item.title = title;
    item.description = description;
    item.quantity = quantity;
    item.purchased = false;

    return item.save();
  },

  async updateItem(id: number, payload) {
    try {
      const item = await Item.findOneBy({ id });
      if (!item) throw new Error("Invalid id");
      const result = await Item.update({ id }, payload);
      if (result.affected === 0) throw new Error("Error");

      return;
    } catch (e) {
      console.log(e);
    }
  },

  async deleteItem(id: number) {
    const result = await Item.delete({ id });
    if (result.affected === 0) throw new Error("Invalid id");
    return result;
  },
};

export default itemService;
