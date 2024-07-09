import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { changeStatus, fetchItems } from "../api/item";
import { Actions, ItemType } from "../common/types";
import DeleteModal from "../components/DeleteModal";
import ItemModal from "../components/ItemModal";
import ListItem from "../components/ListItem";

const HomePage = () => {
  const [isItemModalShown, setIsItemModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ItemType | null>(null);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => fetchItems(),
  });

  const handleItemModal = (item?: ItemType | null) => {
    setItemToEdit(item || null);
    setIsItemModalShown((prev) => !prev);
  };

  const handleDeleteModal = (itemId?: number | null) => {
    setItemIdToDelete(itemId || null);
    setIsDeleteModalShown((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: async ({
      id,
      purchased,
    }: {
      id: number;
      purchased: boolean;
    }) => {
      return changeStatus(id, purchased);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: unknown) => {
      const errorMessage = "An unexpected error occurred";
      console.error(errorMessage, error);
    },
  });

  const handleChangeStatus = (id: number, purchased: boolean) => {
    mutation.mutate({ id, purchased });
  };

  return (
    <>
      {isItemModalShown && (
        <ItemModal
          handleItemModal={handleItemModal}
          action={itemToEdit ? Actions.EDIT : Actions.ADD}
          item={itemToEdit}
        />
      )}
      {isDeleteModalShown && (
        <DeleteModal
          handleDeleteModal={handleDeleteModal}
          itemId={itemIdToDelete}
        />
      )}
      <div className="relative mx-auto h-full w-[1025px] py-5">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoaderCircle className="h-12 w-12 animate-spin text-blue-check" />
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center ">
            {data && data.length > 0 ? (
              <div className="flex h-full w-full flex-col">
                <div className="mb-4 flex items-end justify-between">
                  <h1 className="text-xl font-bold">Your Items</h1>
                  <button
                    onClick={() => handleItemModal(null)}
                    className="rounded bg-blue px-4 py-2 text-white"
                  >
                    Add Item
                  </button>
                </div>
                <ul className="h-full space-y-2 overflow-y-auto ">
                  {data.map((item: ItemType) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      handleItemModal={handleItemModal}
                      handleDeleteModal={handleDeleteModal}
                      handleChangeStatus={handleChangeStatus}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex h-[300px] w-[600px] flex-col items-center justify-center rounded border border-gray-300 p-6 shadow-md">
                <p>Your shopping list is empty 😥</p>
                <button
                  onClick={() => handleItemModal(null)}
                  className="mt-4 rounded bg-blue px-4 py-2 text-white"
                >
                  Add your first item
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
