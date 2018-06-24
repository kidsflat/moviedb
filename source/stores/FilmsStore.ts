import {observable, action, computed} from 'mobx';

import {ICardContent} from 'pages/FilmsPage/components/Card/Card';

import {LoadingFilms} from 'common-helper-functions/LoadingFilms';

import {apiConsts} from 'apiLib/apiConsts';


interface IFilmsStore {
  category?: string;
  currentPage: number;
  films?: ICardContent[];
  loaded?: boolean;
  error?: boolean;
  allContentLoaded?: boolean;
  init: (category: string) => void;
  addFilms: (films?: ICardContent[]) => void;
  loadFilms: () => void;
  removeFilm: (id: number) => void;
}

class FilmsStore implements IFilmsStore {

  category: string
  search?: string
  currentLoading?: LoadingFilms
  @observable films: ICardContent[] = []
  @observable loaded = false
  @observable error = false
  @observable allContentLoaded = false

  @action.bound init(category: string, search?: string) {
    this.clear();
    this.category = category;
    this.search = search;
  }

  @action.bound addFilms(films?: ICardContent[]) {
    if (!films || films.length < 1) return;
    this.films.splice(this.currentPage * apiConsts.cardsOnPage, this.films.length - this.currentPage, ...films);
  }

  @action.bound loadFilms() {
    if (this.loaded || this.allContentLoaded) return;
    this.loaded = true;
    const handleSuccess = (films?: ICardContent[]) => {
      this.loaded = false;
      if (!films){
        this.currentLoading = undefined;
        return;
      }
      this.addFilms(films);
      if (films.length < apiConsts.cardsOnPage){
        this.allContentLoaded = true
      }
      this.currentLoading = undefined;
    }
    const handleError = () => {
      this.loaded = false;
      this.error = true;
      this.currentLoading = undefined;
    }
    const query = {
      category: this.category,
      page: this.currentPage + 1,
      search: this.search
    }
    this.currentLoading = new LoadingFilms(handleSuccess, handleError, query);
  }

  @action.bound removeFilm(id: number) {
    const filmIndexToRemove = this.films.findIndex(film => film.id === id);
    this.films.splice(filmIndexToRemove, 1);
  }

  @computed get currentPage() {
    const page = Math.floor(this.films.length / apiConsts.cardsOnPage);
    return page;
  }

  @action.bound clear() {
    this.category = undefined;
    this.search = undefined;
    this.films = [];
    this.loaded = false;
    this.error = false;
    this.allContentLoaded = false;
    if (this.currentLoading){
      this.currentLoading.cancel();
      this.currentLoading = undefined;
    }
  }

}

export const filmsStore = new FilmsStore();