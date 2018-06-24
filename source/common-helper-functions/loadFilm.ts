import {IFilmContent} from 'stores/FilmStore';

import {requestFilm} from 'apiLib/requestFilm';
import {apiConsts} from 'apiLib/apiConsts';


type loadFilmType = (successCb: Function, errorCb: Function, category: string, id: number) => void;

export const loadFilm: loadFilmType = (successCb, errorCb, category, id) => {
  let requestCategory: 'tv' | 'movie' = 'movie';
  if (category === 'tvshows'){
    requestCategory = 'tv'
  }  else if (category === 'movies'){
    requestCategory = 'movie'
  }

  const receiveLoadedFilm = (content: any) => {
    const backdrops: string[] = [];
    content.images.backdrops.forEach((backdrop: any, i: number) => {
      if (i > 14) return;
      const backdropUrl = `${apiConsts.imageUrl}${backdrop['file_path']}`;
      backdrops.push(backdropUrl);
    });
    const relatedFilms = content.similar.results.map((film: any) => {
      const filmContent = {
        id: film.id,
        image: `${apiConsts.imageUrl}${film['poster_path']}`,
        category: requestCategory
      }
      return filmContent;
    });
    const filmContent: IFilmContent = {
      id,
      title: content.title || content.name,
      overview: content.overview,
      poster: `${apiConsts.imageUrl}${content['poster_path']}`,
      backdrops: backdrops,
      genres: content.genres.map((genre: any) => genre.name),
      popularity: content.popularity,
      voteAverage: content['vote_average'],
      relatedFilms: relatedFilms
    }
    successCb(filmContent);
  }

  requestFilm(receiveLoadedFilm, errorCb, requestCategory, id)
}