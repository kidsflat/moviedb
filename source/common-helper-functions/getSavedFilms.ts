import {ICardContent} from 'pages/FilmsPage/components/Card/Card';

export const getSavedFilms = (): ICardContent[] => {
  let savedFilms: ICardContent[];

  // Check if localStorage.films is proper JSON object
  let localSavedFilms: object | null;
  try {
    JSON.parse(localStorage.savedFilms)
  } catch {
    localSavedFilms = null;
  } finally {
    if (localSavedFilms !== null){
      localSavedFilms = JSON.parse(localStorage.savedFilms);
    }
  }

  // If localStorage.films is Array than return it
  if (Array.isArray(localSavedFilms)){
    savedFilms = localSavedFilms
  } else {
    localStorage.savedFilms = '[]';
    savedFilms = [];
  }

  return savedFilms
}