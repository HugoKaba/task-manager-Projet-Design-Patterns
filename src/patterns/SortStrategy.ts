import { Task } from '../types/Task';

export interface SortStrategy {
	sort(tasks: Task[]): Task[];
}

export class ResetSort implements SortStrategy {
	sort(tasks: Task[]): Task[] {
		return tasks;
	}
}

export class SortByCompletion implements SortStrategy {
	sort(tasks: Task[]): Task[] {
		return [...tasks].sort((a, b) => Number(b.completed) - Number(a.completed));
	}
}

export class SortByAlphabetical implements SortStrategy {
	sort(tasks: Task[]): Task[] {
		return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
	}
}
