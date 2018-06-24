import {ICardContent} from 'pages/FilmsPage/components/Card/Card';

import {loadFilms} from 'common-helper-functions/loadFilms';


interface ILoadingFilms {
  onSuccess?: Function;
  onError?: Function;
  cancel: () => void;
}

export class LoadingFilms implements ILoadingFilms {

  onSuccess: Function
  onError: Function

  constructor(onSuccess: Function, onError: Function, query: {category: string; page: number; search?: string}) {
    this.onSuccess = onSuccess;
    this.onError = onError;
    const handleSuccess = (film: ICardContent) => {
      this.onSuccess && this.onSuccess(film)
    }
    const handleError = () => {
      this.onError && this.onError()
    }
    loadFilms(handleSuccess, handleError, query);
  }

  cancel = () => {
    this.onSuccess = undefined;
    this.onError = undefined;
  }

}