import {apiConsts} from './apiConsts';

type requestFilmType = (successCb: Function, errorCb: Function, category: string, id: number) => void;
export const requestFilm: requestFilmType = (successCb, errorCb, category, id) => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', `${apiConsts.url}/${category}/${id}?api_key=${apiConsts.key}&append_to_response=images,similar`);
  xhr.onload = () => {
    const responseResults: object[] = JSON.parse(xhr.responseText);
    successCb(responseResults);
  }
  xhr.onerror = () => {
    errorCb(xhr.status, xhr.statusText);
  }
  xhr.send();
}