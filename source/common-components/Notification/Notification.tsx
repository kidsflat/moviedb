import * as React from 'react';

import {notificationStore} from 'stores/NotificationStore';

const s: {[props: string]: string} = require('./Notification.css');


interface INotificationProps {
  children: string;
  tone: '-' | '+';
  id: number;
  pos: number;
}

export class Notification extends React.Component<INotificationProps> {

  remove = () => {
    notificationStore.destroyNotification(this.props.id);
  }

  render() {
    let wrapperClass = s.wrapper;
    if (this.props.tone === '-'){
      wrapperClass += ` ${s['wrapper_negative']}`;
    } else if (this.props.tone === '+'){
      wrapperClass += ` ${s['wrapper_positive']}`;
    }
    return (
      <div style={{bottom: `${145*this.props.pos+30}px`}} className={wrapperClass}>
        <div onClick={this.remove} className={s.closeIcon} />
        <div className={s.icon} />
        <div className={s.message}>{this.props.children}</div>
      </div>
    );
  }

}