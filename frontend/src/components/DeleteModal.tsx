import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../api/item"; // Asegúrate de tener una función deleteItem en tu API
import { DeleteModalType } from "../common/types";
import { useState } from "react";

const DeleteModal: React.FC<DeleteModalType> = ({
  handleDeleteModal,
  itemId,
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      return deleteItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsLoading(false);
      handleDeleteModal();
    },
    onError: (error: unknown) => {
      setIsLoading(false);
      const errorMessage = "An unexpected error occurred";
      console.error(errorMessage, error);
    },
  });

  const handleDelete = () => {
    setIsLoading(true);
    mutation.mutate(itemId);
  };

  return (
    <div className="absolute top-0 z-50 m-auto flex h-screen w-full items-center justify-center bg-slate-400/50">
      <div className="flex h-[200px] flex-col rounded-md bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Delete Item?</h2>
        <p>Are you sure you want to delete this item? This can not be undone</p>
        <div className="mt-auto flex justify-end gap-x-4 pt-4">
          <button
            type="button"
            onClick={handleDeleteModal}
            className="rounded border p-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-blue rounded p-2 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
