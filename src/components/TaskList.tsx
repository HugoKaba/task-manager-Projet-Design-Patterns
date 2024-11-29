import React, { useState } from "react";
import { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleCompletion }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-list">
      <button onClick={toggleList} className="toggle-btn">
        {isOpen ? "Hide Tasks" : "Show Tasks"}
      </button>
      <ul className={`task-list ${isOpen ? "open" : "closed"}`}>
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-details">
              <span><strong>Title:</strong> {task.title}</span>
              <p><strong>Description:</strong> {task.description}</p>
            </div>
            <div className="task-actions">
              <button
                className="complete-btn"
                onClick={() => onToggleCompletion(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
