import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { createItem, updateItem } from "../api/item";
import { Actions, CreateItemType, ItemModalType } from "src/common/types";
import { FormEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const ItemModal: React.FC<ItemModalType> = ({
  handleItemModal,
  action,
  item,
}) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (itemData: CreateItemType) => {
      return action === "Add"
        ? createItem(itemData)
        : updateItem(item!.id, itemData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsLoading(false);
      handleItemModal();
    },
    onError: (error: unknown) => {
      setIsLoading(false);
      const errorMessage = "An unexpected error occurred";
      console.error(errorMessage, error);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    mutation.mutate({
      title,
      description,
      quantity: Number(quantity),
      purchased,
    });
  };

  useEffect(() => {
    if (item !== null) {
      setTitle(item.title);
      setDescription(item.description);
      setQuantity(item.quantity.toString());
      setPurchased(item.purchased);
    }
  }, [item]);

  return (
    <div className="absolute top-0 z-50 m-auto flex h-screen w-full items-center justify-center bg-slate-400/50">
      <div className="flex h-[600px] w-full max-w-lg flex-col rounded-md bg-white">
        <div className="flex items-center justify-between bg-slate-100 p-5">
          <span className="uppercase">shopping list</span>
          <ChevronRight />
        </div>
        <div className="flex h-full flex-col justify-between px-6">
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col gap-y-4 pt-4"
          >
            <div className="gap-y-1">
              <h2>{action} an Item</h2>
              <p className="text-sm text-light-gray">
                {action} your {action === "Add" ? "new" : ""} item below
              </p>
            </div>
            <div className="flex flex-grow flex-col gap-y-4">
              <TextField
                label="Item Name"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
              />
              <div className="relative">
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  fullWidth
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="absolute bottom-2 right-4"
                >
                  {description.length}/100
                </Typography>
              </div>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel id="quantity-label">How many?</InputLabel>
                <Select
                  labelId="quantity-label"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  label="How many?"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              {action === Actions.EDIT && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="purchased"
                    checked={purchased}
                    onChange={(e) => setPurchased(e.target.checked)}
                  />
                  <label htmlFor="purchased" className="ml-2">
                    Purchased
                  </label>
                </div>
              )}
            </div>
            <div className="mt-auto flex justify-end gap-x-4 pb-4">
              <button
                type="button"
                onClick={handleItemModal}
                className="rounded border p-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center rounded bg-blue p-2 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  `${action === Actions.ADD ? "Add Task" : "Save Item"} `
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
