import {observable, computed, action} from 'mobx';

import {getSavedFilms} from 'common-helper-functions/getSavedFilms';

import {ICardContent} from 'pages/FilmsPage/components/Card/Card';


interface ILibraryStore {
  savedFilms: ICardContent[];
  savedFilmsCount: number;
  addFilm: (film: ICardContent) => void;
  removeFilm: (id: number) => void;
}

class LibraryStore implements ILibraryStore {

  @observable savedFilms = getSavedFilms()

  @computed get savedFilmsCount(){
    const savedFilmsCount = this.savedFilms.length;
    return savedFilmsCount;
  }

  @action.bound addFilm(film: ICardContent) {
    this.savedFilms.push(film);
    localStorage.savedFilms = JSON.stringify(this.savedFilms);
  }

  @action.bound removeFilm(id: number) {
    this.savedFilms.forEach((film, i) => {
      if (film.id === id){
        this.savedFilms.splice(i, 1);
        localStorage.savedFilms = JSON.stringify(this.savedFilms);
      }
    })
  }

}

export const libraryStore = new LibraryStore();