import * as React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import {libraryStore} from 'stores/LibraryStore';
import {notificationStore} from 'stores/NotificationStore';
import {filmsStore} from 'stores/FilmsStore';

const s: {[props: string]: string} = require('./Card.css');


export interface ICardContent {
  id: number;
  title: string;
  overview: string;
  image: string;
  category: string
}

interface ICardProps {
  children: ICardContent;
}

interface ICardState {
  overview: boolean
}


@observer
export class Card extends React.Component<ICardProps, ICardState> {
  state = {
    overview: false
  }

  isSaved = () => {
    const isSaved = libraryStore.savedFilms.some((savedFilm) => {
      return savedFilm.id === this.props.children.id
    });
    return isSaved
  }

  handleAdd = () => {
    libraryStore.addFilm(this.props.children);
    const message = `'${this.props.children.title}' has been added successfully`;
    notificationStore.showNotification(message, '+');
  }

  handleRemove = () => {
    libraryStore.removeFilm(this.props.children.id);
    const message = `'${this.props.children.title}' has been removed successfully`;
    notificationStore.showNotification(message, '-');
    if (filmsStore.category === 'library'){
      filmsStore.removeFilm(this.props.children.id);
    }
  }

  toggleOverview = () => {
    this.setState({overview: !this.state.overview});
  }

  closeOverview = () => {
    this.setState({overview: false});
  }

  render() {
    const cardClass = this.isSaved() ? `${s.card} ${s.cardSaved}` : s.card;
    return (
      <div onMouseLeave={this.closeOverview} style={{backgroundImage: `url(${this.props.children.image})`}} className={cardClass}>
        <div className={s.cardHover}>
          <div className={s.cardHeader}>
            <div onClick={this.toggleOverview} className={s.cardOverviewIcon}></div>
            {
              this.isSaved() ?
                <div onClick={this.handleRemove} className={s.cardRemove}></div> :
                <div onClick={this.handleAdd} className={s.cardAdd}></div>
            }
          </div>
          <Link to={`/film/${this.props.children.category}/${this.props.children.id}`}  className={s.cardMain}>
            <div className={s.cardTitle}>{this.props.children.title}</div>
            <div className={
              this.state.overview ?
                `${s.cardOverviewContent} ${s.cardOverviewContentShown}` :
                s.cardOverviewContent
            }>
              {this.props.children.overview}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}