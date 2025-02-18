import { useState, useEffect } from "react";
import Button from "./components/button/button";
import Title from "./components/title/title";


function App() {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>(
    [],
  );
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      console.log("Hämtade från LocalStorage:", savedTasks);
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    console.log("Uppdaterar LocalStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks((prev) => [...prev, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const removeTask = (indexToRemove: number) => {
    setTasks((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const toggleComplete = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  };

  const saveEdit = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, text: editedText } : task,
      ),
    );
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <Title text="Att göra-lista" />

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Lägg till en uppgift..."
            className="flex-1 p-2 border rounded-lg"
          />
          <Button onClick={addTask}>➕</Button>
        </div>

        <ul className="mt-4 space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 bg-gray-100 rounded-lg ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="h-4 w-4"
                />
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="text-lg flex-1"
                  />
                ) : (
                  <span
                    className="text-lg"
                    onDoubleClick={() => startEditing(index)}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {editingIndex === index ? (
                  <button
                    onClick={() => saveEdit(index)}
                    className="text-green-500 hover:text-green-700"
                  >
                    ✔️
                  </button>
                ) : (
                  <button
                    onClick={() => removeTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            Inga uppgifter ännu...
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
