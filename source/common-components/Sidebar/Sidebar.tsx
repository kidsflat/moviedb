import * as React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {computed} from 'mobx';
import {observer, Observer} from 'mobx-react';

import {ICardContent} from 'pages/FilmsPage/components/Card/Card';

import {sidebarStore} from 'stores/SidebarStore';
import {libraryStore} from 'stores/LibraryStore';

const s: {[props: string]: string} = require('./Sidebar.css');


export class Sidebar extends React.Component {

  @computed get openCloseClass() {
    let sidebarClass = s.sidebar;
    sidebarStore.opened ?
      sidebarClass += ' '+s.sidebarOpened :
      sidebarClass += ' '+s.sidebarClosed;
    return sidebarClass;
  }

  @computed get libraryIndicator() {
    const savedFilmsCount = libraryStore.savedFilmsCount;
    let libraryIndicator: null | JSX.Element;
    if (savedFilmsCount){
      const indicator = savedFilmsCount > 10 ? '10+' : savedFilmsCount;
      libraryIndicator = <span className={s.libraryIndicator}>({indicator})</span>
    } else {
      libraryIndicator = null
    }
    return libraryIndicator
  }

  render() {
    
    return (
      <Observer>
        {() =>
          <div className={this.openCloseClass}>
            <div className={s.content}>
              <div className={s.top}>
                <div className={s.toggleIconWrapper}>
                  {sidebarStore.opened ?
                    <span onClick={sidebarStore.close} className={`${s.closeIcon} ${s.toggleIcon}`} /> :
                    <span onClick={sidebarStore.open} className={`${s.openIcon} ${s.toggleIcon}`}/>}
                </div>
                <Link to='/'>
                  <div className={s.logo}>
                    <div className={s.logoIcon} />
                    <div className={s.logoText}><span>Movie</span> <span>House</span></div>
                  </div>
                </Link>
              </div>
              <div className={s.pagesNav}>
                <NavLink to='/films/movies' activeClassName={s['pageLink_active']} className={s.pageLink}>
                  <span className={`${s.movieIcon} ${s.pageIcon}`} />
                  <span className={s.pageText}>Movie</span>
                </NavLink>
                <NavLink to='/films/tvshows' activeClassName={s['pageLink_active']} className={s.pageLink}>
                  <span className={`${s.tvshowIcon} ${s.pageIcon}`} />
                  <span className={s.pageText}>TV Show</span>
                </NavLink>
                <NavLink to='/films/library' activeClassName={s['pageLink_active']} className={s.pageLink}>
                  <span className={`${s.libraryIcon} ${s.pageIcon}`} />
                  <span className={s.pageText}>My Library</span>
                  {this.libraryIndicator}
                </NavLink>
                <NavLink to='/support' activeClassName={s['pageLink_active']} className={s.pageLink}>
                  <span className={`${s.supportIcon} ${s.pageIcon}`} />
                  <span className={s.pageText}>Support</span>
                </NavLink>
              </div>
            </div>
          </div>
        }
      </Observer>
    );
  }
}