class Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;

	constructor(id: string, title: string, description: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.completed = false;
	}
}

export class TaskFactory {
	static createTask(title: string, description: string): Task {
		return new Task(Date.now().toString(), title, description);
	}
}
