import {observable, action} from 'mobx';


interface INotification {
  message: string;
  tone: '-' | '+';
  id: number
}

interface INotificationStore {
  notifications: INotification[];
  showNotification: (message: string, tone: '-' | '+') => void;
  destroyNotification: (id: number) => void;
}


class NotificationStore implements INotificationStore {

  @observable notifications: INotification[] = []

  @action.bound showNotification(message: string, tone: '-' | '+') {
    const id = window.setTimeout(() => {
      this.destroyNotification(id)
    }, 3000);
    this.notifications.push({message, tone, id});
  }

  @action.bound destroyNotification(id: number) {
    const notificationIndex = this.notifications.findIndex(notification => {
      const notificationToDesctroy = notification.id === id;
      return notificationToDesctroy;
    });
    this.notifications.splice(notificationIndex, 1);
  }

}

export const notificationStore = new NotificationStore();