import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchItems } from "src/api/item";
import { ItemType } from "src/common/types";
import ItemModal from "src/components/ItemModal";

const HomePage = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => fetchItems(),
  });

  console.log("items ", data);
  console.log(isLoading);
  const handleItemModal = () => {
    setIsModalShown((prev) => !prev);
  };

  return (
    <>
      {isModalShown && <ItemModal handleItemModal={handleItemModal} />}
      <div className="mx-auto max-w-2xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Your Items</h1>
          <button
            onClick={handleItemModal}
            className="rounded bg-blue-500 p-2 text-white"
          >
            Add Item
          </button>
        </div>
        {data && data?.length > 0 ? (
          <div className="space-y-2">
            {data.map((item: ItemType) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded border border-gray-300 p-4 shadow-sm hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded border border-gray-300 p-6 shadow-md">
            <p>Your shopping list is empty :(</p>
            <button
              onClick={handleItemModal}
              className="mt-4 rounded bg-blue-500 p-2 text-white"
            >
              Add your first item
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
