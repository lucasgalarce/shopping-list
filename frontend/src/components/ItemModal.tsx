import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { createItem } from "../api/item";
import { CreateItemType } from "src/common/types";
import { useState } from "react";

const ItemModal = ({ handleItemModal }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("TO_DO");
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (createItemData: CreateItemType) => {
      return createItem(createItemData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsLoading(false);
      handleItemModal();
    },
    onError: (error: unknown) => {
      setIsLoading(false);
      let errorMessage = "An unexpected error occurred";
      console.error(errorMessage, error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    mutation.mutate({ title, description, quantity: Number(quantity) });
  };

  return (
    <div className="absolute top-0 z-50 m-auto flex h-screen w-full items-center justify-center bg-slate-400/50">
      <div className="flex h-[600px] flex-col rounded-md bg-white ">
        <div className="flex items-center justify-between bg-slate-100 p-5">
          <span className="uppercase">shopping list</span>
          <i>chevron</i>
        </div>
        <div className="flex h-full flex-col justify-between px-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 pt-4">
            <div className="gap-y-1">
              <h2>ADD/EDIT an item</h2>
              <p>ADD/EDIT your new item below</p>
            </div>
            <div className="flex flex-col gap-y-4">
              <input
                type="text"
                placeholder="Item Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="resize-none"
                name="description"
                id=""
                rows={10}
                cols={50}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <select
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              >
                <option value="test">test</option>
                <option value="test2">test2</option>
                <option value="test3">test3</option>
              </select>
            </div>
            <div className="flex justify-end gap-x-4 pb-4">
              <button
                type="button"
                onClick={handleItemModal}
                className="rounded border p-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center rounded bg-blue-500 p-2 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Add Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

// {isLoading ? (
//   <LoaderCircle className="animate-spin" />
// ) : (
