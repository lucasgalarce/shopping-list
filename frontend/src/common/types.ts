export type ItemType = {
  id: number;
  title: string;
  description: string;
  quantity: number;
  purchased: boolean;
};

export type CreateItemType = {
  title: string;
  description: string;
  quantity: number;
  purchased: boolean;
};

export type ItemModalType = {
  handleItemModal: () => void;
  action: string;
  item: ItemType | null;
};

export type ListItemType = {
  item: ItemType;
  handleItemModal: (item: ItemType) => void;
  handleDeleteModal: (id: number) => void;
  handleChangeStatus: (id: number, purchased: boolean) => void;
};

export type DeleteModalType = {
  handleDeleteModal: () => void;
  itemId: number | null;
};

export enum Actions {
  EDIT = "Edit",
  ADD = "Add",
}
