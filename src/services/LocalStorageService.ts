import { Task } from '../types/Task';
import { Notification } from '../types/Notification';

class LocalStorageService {
	static loadTasks(): Task[] {
		const tasks = localStorage.getItem('tasks');
		return tasks ? JSON.parse(tasks) : [];
	}

	static saveTasks(tasks: Task[]): void {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	static deleteTask(id: string): void {
		const tasks = LocalStorageService.loadTasks();
		const updatedTasks = tasks.filter((task) => task.id !== id);
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	}

	static loadNotification(): Notification[] {
		const notifications = localStorage.getItem('notifications');
		return notifications ? JSON.parse(notifications) : [];
	}

	static saveNotifications(notifications: Notification[]): void {
		localStorage.setItem('notifications', JSON.stringify(notifications));
	}
}
export default LocalStorageService;
