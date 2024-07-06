import axios from "axios";
import { useState } from "react";

const HomePage = () => {
  const task = {
    title: "test",
    description: "test",
    status: "TO_DO",
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const createTask = async () => {
    console.log("createTask");
    console.log("title");
    const url = `http://localhost:3000/api/tasks`;
    const result = await axios.post(url, { title, description, status });
    console.log(result);
  };

  return (
    <div className="container mx-auto flex  items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-around">
        <form>
          <div>
            <label>
              title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <label>
            status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <div>
            <button
              className="border-2 border-red-500"
              onClick={() => createTask()}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
