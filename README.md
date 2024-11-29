# Collaborative Task Manager

## Description

The **Collaborative Task Manager** is a task management application built using **Vite** and **React**. It allows users to add, delete, and toggle tasks while providing sorting functionalities based on task completion or alphabetical order. Additionally, it includes a notification system to alert users of important actions such as task addition, deletion, or completion toggling. The app also provides an **Undo Delete** feature to restore a recently deleted task.

The application is built with **design patterns** for better scalability and maintainability, specifically:
- **Factory Pattern** for task creation.
- **Strategy Pattern** for sorting tasks.
- **Observer Pattern** for managing notifications.

The app uses **LocalStorage** for persisting tasks and notifications, ensuring data is retained even after page reloads or app closure.

## Features

- **Add Task**: Allows users to add a new task with a title and description.
- **Delete Task**: Tasks can be deleted, with the option to undo the deletion.
- **Toggle Task Completion**: Mark tasks as completed or incomplete.
- **Sort Tasks**: Tasks can be sorted by:
  - Completion Status (completed/incomplete)
  - Alphabetically by title
- **Undo Task Deletion**: After deleting a task, a button appears to undo the deletion and restore the task.
- **Notifications**: Notifies users when tasks are added, deleted, or marked as completed/incomplete.

## Technologies Used

- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **React**: Frontend library for building the user interface.
- **TypeScript**: Superset of JavaScript providing static types.
- **LocalStorage**: Used for persisting tasks and notifications locally.
- **CSS**: Styling for the app.
- **Design Patterns**: The app uses several design patterns, such as:
  - **Factory Pattern**: To create tasks.
  - **Strategy Pattern**: To manage sorting tasks by different criteria.
  - **Observer Pattern**: For the notification system.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git


## Creator

**Hugo Kaba**
