import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import { CreateItemType, ItemType } from "../common/types";
import { config } from "./config";

const apiHost = config.apiHost;
const base = apiHost + "/items";

export const fetchItems = async () => {
  const url = base;
  const response: AxiosResponse<ItemType[]> = await api.get(`${url}`);

  return response.data;
};

export const fetchItem = async (id: unknown) => {
  const response: AxiosResponse = await api.get(`${base}/${id}`);

  return response.data;
};

export const createItem = async (data: CreateItemType) => {
  const response = await api.post(base, { ...data });

  return response.data;
};

export const changeStatus = async (id: number, purchased: boolean) => {
  const response = await api.put(`${base}/${id}`, { purchased });

  return response.data;
};

export const updateItem = async (id: number, data: CreateItemType) => {
  const response = await api.put(`${base}/${id}`, { data });

  return response.data;
};

export const deleteItem = async (id: number) => {
  await api.delete(`${base}/${id}`);
};
