import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import NotificationList from "./components/NotificationList";
import { TaskFactory } from "./patterns/TaskFactory";
import { SortByCompletion, SortByAlphabetical, SortStrategy, ResetSort } from "./patterns/SortStrategy";
import { notificationSystem } from "./patterns/NotificationSystem";
import LocalStorageService from "./services/LocalStorageService";
import { Task } from "./types/Task";
import { Notification } from "./types/Notification";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sortStrategy, setSortStrategy] = useState<SortStrategy>(new ResetSort());
  const [lastDeletedTask, setLastDeletedTask] = useState<Task | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [activeSort, setActiveSort] = useState<string | null>(null);

  useEffect(() => {
    const loadedTasks = LocalStorageService.loadTasks();
    const loadedNotifications = LocalStorageService.loadNotification();
    setTasks(loadedTasks);
    setNotifications(loadedNotifications);
  }, []);

  useEffect(() => {
    const handleNotification = (message: string) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message,
        type: "info",
        timestamp: Date.now(),
      };
      setNotifications((prev) => {
        const updatedNotifications = [...prev, newNotification];
        LocalStorageService.saveNotifications(updatedNotifications);
        return updatedNotifications;
      });
    };

    notificationSystem.subscribe(handleNotification);

    return () => {
      notificationSystem.unsubscribe(handleNotification);
    };
  }, []);

  useEffect(() => {
    LocalStorageService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask = TaskFactory.createTask(title, description);
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      LocalStorageService.saveTasks(updatedTasks);
      return updatedTasks;
    });
    notificationSystem.notify(`Task "${title}" added!`);
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete) {
      setLastDeletedTask(taskToDelete);
      setShowUndo(true);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      notificationSystem.notify(`Task "${taskToDelete.title}" deleted!`);
      LocalStorageService.deleteTask(id);
    }
  };

  const undoDelete = () => {
    if (lastDeletedTask) {
      setTasks((prev) => {
        const updatedTasks = [...prev, lastDeletedTask];
        LocalStorageService.saveTasks(updatedTasks);
        return updatedTasks;
      });
      notificationSystem.notify(`Task "${lastDeletedTask.title}" restored!`);
      setLastDeletedTask(null);
      setShowUndo(false);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((task) => task.id === id);
    if (task) {
      notificationSystem.notify(
        `Task "${task.title}" marked as ${task.completed ? "incomplete" : "completed"}!`
      );
    }
  };

  const toggleSort = (strategy: SortStrategy, strategyName: string) => {
    if (activeSort === strategyName) {
      setSortStrategy(new ResetSort());
      setActiveSort(null);
    } else {
      setSortStrategy(strategy);
      setActiveSort(strategyName);
    }
  };

  const sortedTasks = sortStrategy.sort(tasks);

  return (
    <div className="app">
      <h1>Collaborative Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <div className="sort-options">
        <button
          className={`sort-btn ${activeSort === "completion" ? "active" : ""}`}
          onClick={() => toggleSort(new SortByCompletion(), "completion")}
        >
          Sort by Completion
        </button>
        <button
          className={`sort-btn ${activeSort === "alphabetical" ? "active" : ""}`}
          onClick={() => toggleSort(new SortByAlphabetical(), "alphabetical")}
        >
          Sort Alphabetically
        </button>
      </div>
      <TaskList
        tasks={sortedTasks}
        onDelete={deleteTask}
        onToggleCompletion={toggleTaskCompletion}
      />
      <NotificationList notifications={notifications} />
      {showUndo && (
        <button className="undo-btn" onClick={undoDelete}>
          Undo Delete
        </button>
      )}
    </div>
  );
};

export default App;
