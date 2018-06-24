import {apiConsts} from 'apiLib/apiConsts';
import {requestFilms} from 'apiLib/requestFilms';
import {getSavedFilms} from 'common-helper-functions/getSavedFilms';
import {ICardContent} from 'pages/FilmsPage/components/Card/Card';

type requestFilmsFromLibType = (cb: Function) => void;
const requestFilmsFromLib: requestFilmsFromLibType = (cb) => {
  // Simulate request timeout
  setTimeout(cb.bind(undefined, getSavedFilms()), 250);
}

type loadFilmsType = (successCb: Function, errorCb: Function, query: {category: string; page: number; search?: string}) => void;

export const loadFilms: loadFilmsType = (successCb, errorCb, query) => {
  type receiveLoadedFilmsType = (films: any[]) => void;

  const receiveLoadedFilms: receiveLoadedFilmsType = (films) => {

    try {
      const cardsContent: ICardContent[] = [];
      films.forEach((film) => {
        const filmCategory = film.category || query.category;
        const cardContent: ICardContent = {
          id: film.id,
          title: film.title || film.name,
          overview: film.overview,
          image: `${apiConsts.imageUrl}${film['poster_path']}`,
          category: filmCategory
        };
        cardsContent.push(cardContent);
      });
      successCb(cardsContent);
    } catch {
      errorCb();
    }

  }

  switch (query.category){
    case 'movies':
    case 'tvshows':
      requestFilms(receiveLoadedFilms, errorCb, query);
      break;
    case 'library':
      requestFilmsFromLib(successCb);
      break;
    default:
      successCb(undefined);
  }

}