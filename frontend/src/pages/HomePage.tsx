import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { changeStatus, fetchItems } from "src/api/item";
import { ItemType } from "src/common/types";
import ItemModal from "src/components/ItemModal";

const HomePage = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ItemType | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => fetchItems(),
  });

  console.log("items ", data);
  console.log(isLoading);
  const handleItemModal = (item?: ItemType | null) => {
    setItemToEdit(item || null);
    setIsModalShown((prev) => !prev);
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
      {isModalShown && (
        <ItemModal
          handleItemModal={handleItemModal}
          action={itemToEdit ? "Edit" : "Add"}
          item={itemToEdit}
        />
      )}
      <div className="container mx-auto border-2 border-red-500 p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            {data && data.length > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">Your Items</h1>
                <button
                  onClick={() => handleItemModal(null)}
                  className="rounded bg-blue-500 p-2 text-white"
                >
                  Add Item
                </button>
              </div>
            )}
            {data && data.length > 0 ? (
              <div className="space-y-2">
                {data.map((item: ItemType) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded border border-gray-300 p-4 shadow-sm hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={item.purchased}
                        onChange={() =>
                          handleChangeStatus(item.id, !item.purchased)
                        }
                      />
                      <div className={item.purchased ? "line-through" : ""}>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        className="hover:text-blue-700"
                        onClick={() => handleItemModal(item)}
                      >
                        <Pencil />
                      </button>
                      <button className=" hover:text-red-700">
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded border border-gray-300 p-6 shadow-md">
                <p>Your shopping list is empty :(</p>
                <button
                  onClick={() => handleItemModal(null)}
                  className="mt-4 rounded bg-blue-500 p-2 text-white"
                >
                  Add your first item
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
