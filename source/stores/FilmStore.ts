import {observable, action} from 'mobx';

import {loadFilm} from 'common-helper-functions/loadFilm';


export interface IFilmContent {
  id: number;
  title: string;
  overview: string;
  poster: string;
  backdrops: string[];
  genres: string[];
  popularity: number;
  voteAverage: number;
  relatedFilms: {id: number; image: string}[]
}

interface IFilmStore {
  filmContent: IFilmContent;
  setFilmContent: (content: IFilmContent) => void;
  loadFilmContent: (category: string, id: number) => void;
}

class FilmStore implements IFilmStore {

  @observable filmContent: IFilmContent

  @action.bound setFilmContent(content: IFilmContent) {
    this.filmContent = content;
  }

  @action.bound loadFilmContent(category: string, id: number) {
    this.filmContent = undefined;
    const handleSuccessLoad = (content: IFilmContent) => {
      this.setFilmContent(content);
    }
    const handleErrorLoad = () => {
      alert('There was an error on load');
    }
    loadFilm(handleSuccessLoad, handleErrorLoad, category, id);
  }

}

export const filmStore = new FilmStore()