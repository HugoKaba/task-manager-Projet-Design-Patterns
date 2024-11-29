export class NotificationSystem {
	private observers: ((message: string) => void)[] = [];

	subscribe(observer: (message: string) => void) {
		this.observers.push(observer);
	}

	unsubscribe(observer: (message: string) => void) {
		this.observers = this.observers.filter((o) => o !== observer);
	}

	notify(message: string) {
		this.observers.forEach((observer) => observer(message));
	}
}

export const notificationSystem = new NotificationSystem();
