import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {observer, Observer} from 'mobx-react';
import ResizeObserver from 'resize-observer-polyfill';

import {PageWrapper} from 'common-components/PageWrapper/PageWrapper';
import {Card} from './components/Card/Card';
import {ICardContent} from './components/Card/Card';

import {libraryStore} from 'stores/LibraryStore';
import {filmsStore} from 'stores/FilmsStore';

import {getUniqKey} from 'common-helper-functions/getUniqKey';
import {executeIfScrolledDown} from './helper-functions/executeIfScrolledDown';
import {apiConsts} from 'apiLib/apiConsts';

const s: {[props: string]: string} = require('./FilmsPage.css');


interface IFilmsPageProps {
  match: {
    params: {
      category: string;
      search?: string;
    }
  }
}

interface IFilmsPageState {
  cardsContent: ICardContent[];
  loaded: boolean;
  error: boolean;
  allContentLoaded: boolean
}


export class FilmsPage extends React.Component<IFilmsPageProps, IFilmsPageState> {

  public cardsGrid: HTMLElement
  public pageWrapperComp: PageWrapper

  setCardsGridClass = () => {
    if (!this.cardsGrid) return;
    const cardsGridWidth = this.cardsGrid.offsetWidth;
    let cardsGridClass = s.cardsGrid;
    if (cardsGridWidth > 0 && cardsGridWidth <= 320){
      cardsGridClass = s['cardsGrid_extrasmall'];
    } else if (cardsGridWidth > 320 && cardsGridWidth <= 500){
      cardsGridClass += ' ' + s['cardsGrid_small'];
    } else if (cardsGridWidth > 500 && cardsGridWidth <= 750){
      cardsGridClass += ' ' + s['cardsGrid_medium'];
    } else if (cardsGridWidth > 750 && cardsGridWidth <= 1050){
      cardsGridClass += ' ' + s['cardsGrid_big'];
    } else if (cardsGridWidth > 1050){
      cardsGridClass += ' ' + s['cardsGrid_extrabig'];
    }
    this.cardsGrid.className = cardsGridClass;
  }

  loadNewFilms = () => {
    filmsStore.init(this.props.match.params.category, this.props.match.params.search);
    filmsStore.loadFilms();
  }

  componentDidUpdate(prevProps: IFilmsPageProps) {
    if (
      this.props.match.params.category !== prevProps.match.params.category ||
      this.props.match.params.search !== prevProps.match.params.search
    ){
      this.loadNewFilms();
    }
  }

  componentWillMount() {
    this.loadNewFilms();
  }

  componentDidMount() {
    const wrapper = this.pageWrapperComp.mainContentWrapperElem;
    executeIfScrolledDown(wrapper, filmsStore.loadFilms);
    wrapper.addEventListener('scroll', () => {
      executeIfScrolledDown(wrapper, filmsStore.loadFilms);
    });
    const wrapperResizeObserver = new ResizeObserver(executeIfScrolledDown.bind(undefined, wrapper, filmsStore.loadFilms));
    wrapperResizeObserver.observe(wrapper);
    const cardsGridResizeObserver = new ResizeObserver(this.setCardsGridClass);
    cardsGridResizeObserver.observe(this.cardsGrid);
  }

  componentWillUnmount() {
    filmsStore.clear();
  }

  render() {
    return (
      <PageWrapper ref={el => this.pageWrapperComp = el}>
        <div ref={el => this.cardsGrid = el} className={s.cardsGrid}>
          <Observer>
            {
              () => filmsStore.films.map((film: ICardContent, i) => {
                return (
                  <div key={getUniqKey()} className={s.cardWrapper}>
                    <Card>{film}</Card>
                  </div>
                )
              })
            }
          </Observer>
        </div>
        <Observer>
          {() => filmsStore.loaded && <div className={s.notification}>Please wait, content loaded...</div>}
        </Observer>
        <Observer>
          {() =>filmsStore.error && <div className={s.notification}>Error on load!</div>}
        </Observer>
        <Observer>
          {
            () => filmsStore.allContentLoaded ?
              this.props.match.params.category === 'library' ? null :
                <div className={s.loadBtnWrapper}>
                  <button onClick={filmsStore.loadFilms} className={s.loadBtn}>Refresh</button>
                </div> : null
          }
        </Observer>
        <Observer>
          {
            () => (filmsStore.films.length < 1 && !filmsStore.loaded && !filmsStore.error) ?
              this.props.match.params.category === 'library' ?
                <div className={s.notification}>You don't have any saved films</div> :
                <div className={s.notification}>No films have been found</div> : null
          }
        </Observer>
      </PageWrapper>
    );
  }
}