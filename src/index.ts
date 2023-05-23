import '/build/css/style.css';
import { Movie } from './Movie';
import { api_key } from './key';

const movieDisplay = document.getElementById(
  'movie-display-container'
) as HTMLElement;
const movieSearchBox = document.getElementById(
  'movie-search-box'
) as HTMLInputElement;
const searchList = document.getElementById('search-list') as HTMLInputElement;

// Get Search Term to call API
function findMovies(): void {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list');
    loadMovies(searchTerm);
  } else {
    searchList.classList.add('hide-search-list');
  }
}

// Generate Movie Results
async function loadMovies(searchTerm: string): Promise<void> {
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`;
  try {
    await fetch(API_URL)
      .then((response) => response.json())
      .then((data: Movie) => {
        if (data.page != null) {
          for (let { poster_path } of data.results) {
            displayPoster(poster_path);
          }
        }
      });
  } catch (error) {
    console.log('Movie wont load', error);
  }
}

// Get Movie Poster
function displayPoster(poster: string): void {
  if (poster != null) {
    const moviePoster = document.createElement('img');
    moviePoster.src = `https://image.tmdb.org/t/p/w200${poster}`;
    moviePoster.setAttribute('id', 'poster');
    movieDisplay.appendChild(moviePoster);
  }
}

// On load
movieSearchBox.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    movieDisplay.innerHTML = '';
    findMovies();
  }
});
