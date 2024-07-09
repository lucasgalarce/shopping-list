import { Pencil, Trash } from "lucide-react";
import { ListItemType } from "src/common/types";

const ListItem: React.FC<ListItemType> = ({
  item,
  handleItemModal,
  handleDeleteModal,
  handleChangeStatus,
}) => {
  return (
    <li
      key={item.id}
      className="flex items-center justify-between rounded border border-gray-300 p-4 shadow-sm hover:bg-gray-100"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={item.purchased}
          onChange={() => handleChangeStatus(item.id, !item.purchased)}
        />
        <div className={`capitalize ${item.purchased ? "line-through" : ""}`}>
          <h3
            className={`text-lg font-semibold ${
              item.purchased ? "text-blue-check" : ""
            }`}
          >
            {item.title}
          </h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="hover:text-blue"
          onClick={() => handleItemModal(item)}
        >
          <Pencil />
        </button>
        <button
          className="hover:text-red-700"
          onClick={() => handleDeleteModal(item.id)}
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
