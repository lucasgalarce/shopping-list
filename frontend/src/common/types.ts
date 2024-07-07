export type ItemType = {
  id: number;
  title: string;
  description: string;
  quantity: number;
  status: boolean;
};

export type CreateItemType = {
  title: string;
  description: string;
  quantity: number;
};
