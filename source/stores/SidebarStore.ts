import {observable, action} from 'mobx';

export interface ISidebarStore {
  opened: boolean;
  close: () => void;
  open: () => void;
}

class SidebarStore implements ISidebarStore {

  @observable opened = true;

  @action.bound close() {
    this.opened = false;
  }

  @action.bound open() {
    this.opened = true;
  }

}

export const sidebarStore = new SidebarStore();