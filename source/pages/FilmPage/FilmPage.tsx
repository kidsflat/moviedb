import * as React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import {filmStore} from 'stores/FilmStore';

import {IFilmContent} from 'stores/FilmStore';

import {PageWrapper} from 'common-components/PageWrapper/PageWrapper';

import {getUniqKey} from 'common-helper-functions/getUniqKey';

const s: {[props: string]: string} = require('./FilmPage.css');


interface IFilmPageProps {
  match: {
    params: {
      id: number;
      category: string;
    }
  }
}

@observer
export class FilmPage extends React.Component<IFilmPageProps> {

  loadFilmContent = () => {
    filmStore.loadFilmContent(this.props.match.params.category, this.props.match.params.id);
  }

  componentDidUpdate(prevProps: IFilmPageProps) {
    if (this.props.match.params.id !== prevProps.match.params.id){
      this.loadFilmContent();
    }
  }

  componentWillMount() {
    this.loadFilmContent();
  }

  render() {
    return (
      <PageWrapper>
        <div className={s.wrapper}>
          {
            filmStore.filmContent ? 
              <div style={{color: '#fff'}}>
                <div className={s.row}>
                  <div className={s.leftCol}>
                    <div className={s.imagesWrapper}>
                      <div style={{backgroundImage: `url(${filmStore.filmContent.poster})`}} className={s.image} />
                      <div className={s.backdropsWrapper}>
                        {
                          filmStore.filmContent.backdrops.map(backdrop => 
                            <div style={{backgroundImage: `url(${backdrop})`}} className={s.backdrop} key={getUniqKey()} />
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className={s.rightCol}>
                    <h2 className={s.title}>{filmStore.filmContent.title}</h2>
                    <div className={s.overview}>{filmStore.filmContent.overview}</div>
                  </div>
                </div>
                <div className={`${s.row} ${s.bottomRow}`}>
                  <div className={s.leftCol}>
                    <div className={s.genres}>
                      <div className={s.genresTitle}>Genres: </div>
                      {filmStore.filmContent.genres.map(genre =>
                        <div className={s.genre} key={getUniqKey()}>{genre}</div>)}
                    </div>
                  </div>
                  <div className={s.rightCol}>
                    <div className={`${s.popularity}`}>
                      <div className={s.progressText}>Popularity:</div>
                      <div className={s.popularityNumber}>{filmStore.filmContent.popularity}</div>
                    </div>
                    <div className={`${s.vote}`}>
                      <div className={s.progressText}>Vote average:</div>
                      <div className={s.voteProgressBar}>
                        <div style={{width: `${filmStore.filmContent.voteAverage*10}%`}} className={s.voteProgress}>{filmStore.filmContent.voteAverage}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.relatedFilms}>
                  {filmStore.filmContent.relatedFilms.map(film =>
                    <Link to={`/film/${this.props.match.params.category}/${film.id}`} style={{backgroundImage: `url(${film.image})`}} className={s.relatedFilm} key={getUniqKey()} />)}
                </div>
              </div> : 
              <div className={s.notification}>
                Wait, content loaded...
              </div>
          }
        </div>
      </PageWrapper>
    );
  }
}