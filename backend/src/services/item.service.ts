import { Item } from "../entities/Item";

const itemService = {
  async getItems() {
    const items = await Item.find();
    return items;
  },

  async createItem(title: string, description: string, quantity: number) {
    console.log("createItem");
    const item = new Item();

    item.title = title;
    item.description = description;
    item.quantity = quantity;
    item.status = false;

    return item.save();
  },

  async updateItem(id: number, payload) {
    const item = await Item.findOneBy({ id });
    if (!item) throw new Error("Invalid id");
    const result = await Item.update({ id }, payload);
    if (result.affected === 0) throw new Error("Error");

    return;
  },

  async deleteItem(id: number) {
    const result = await Item.delete({ id });
    if (result.affected === 0) throw new Error("Invalid id");
    return result;
  },
};

export default itemService;
