import '/build/css/style.css';
import { Movie_Search, Result } from './Movie';
import { api_key } from './key.js';

const movieDisplay = document.getElementById(
  'movie-display-container'
) as HTMLElement;
const movieSearchBox = document.getElementById(
  'movie-search-box'
) as HTMLInputElement;
const searchList = document.getElementById('search-list') as HTMLInputElement;
let searchTerm = movieSearchBox.value.trim();

// Get Search Term to call API
function searchMovies(searchTerm: string): void {
  if (searchTerm.length > 0) {
    loadMovies(searchTerm);
  }
}
// API Call
const fetchMovieList = async (searchTerm: string): Promise<Movie_Search> => {
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`;
  const movieResp = await fetch(API_URL);
  return await movieResp.json();
};

// API Results
function displayPosters(results: Result[]): void {
    for (let { poster_path } of results) {
      displayPoster(poster_path);
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

// Generate Movie Results
const loadMovies = async (searchTerm: string): Promise<void> => {
  try {
    const movieList = await fetchMovieList(searchTerm);
    if (movieList.results.length) {
      displayPosters(movieList.results)
    } else {
      // Display fallback image
    }
  } catch (err) {
    console.error(err);
  }
};

// On load
movieSearchBox.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    const searchTerm = movieSearchBox.value.trim();
    movieDisplay.innerHTML = '';
    searchMovies(searchTerm);
  }
});
