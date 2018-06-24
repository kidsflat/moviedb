import {apiConsts} from './apiConsts';

type requestFilmsType = (successCb: Function, errorCb: Function, query: {category: string; page: number; search?: string}) => void;

export const requestFilms: requestFilmsType = (successCb, errorCb, query) => {
  let category: string;
  switch (query.category){
    case 'movies':
      category = 'movie';
      break;
    case 'tvshows':
      category = 'tv';
      break;
  }

  const url = query.search ?
    `${apiConsts.url}/search/${category}?api_key=${apiConsts.key}&query=${query.search}&page=${query.page}` :
    `${apiConsts.url}/${category}/popular?api_key=${apiConsts.key}&page=${query.page}`;

  const xhr = new XMLHttpRequest();

  xhr.open('get', url);

  xhr.onload = () => {
    const responseResults: object[] = JSON.parse(xhr.responseText).results;
    successCb(responseResults);
  }

  xhr.onerror = () => {
    errorCb(xhr.status, xhr.statusText);
  }

  xhr.send();
}