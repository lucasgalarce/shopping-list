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

export type DeleteModalType = {
  handleDeleteModal: () => void;
  itemId: number | null;
};
