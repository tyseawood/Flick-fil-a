import { MovieSearch, Result } from './Movie'
import { apiKey } from './key'

const movieDisplay = document.getElementById(
  'movie-display-container'
) as HTMLElement
const movieSearchBox = document.getElementById(
  'movie-search-box'
) as HTMLInputElement

// Get Search Term to call API
function searchMovies(searchTerm: string): void {
  if (searchTerm.length > 0) {
    // TODO:(https://github.com/tyseawood/Flick-fil-a/issues/19): Fix floating promise.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-use-before-define
    loadMovies(searchTerm)
  }
}
// Fetch Data, Return JSON
const fetchMovieList = async (searchTerm: string): Promise<MovieSearch> => {
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
  const movieResp = await fetch(API_URL)
  // TODO:(https://github.com/tyseawood/Flick-fil-a/issues/19): Fix no unsafe return
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return movieResp.json()
}

// Movie Results
function displayMovieResults(results: Result[]): void {
  // TODO:(https://github.com/tyseawood/Flick-fil-a/issue/19): Fix restricted syntax
  // eslint-disable-next-line no-restricted-syntax
  for (const { poster_path: posterPath } of results) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayPoster(posterPath)
  }
}

// Generate Poster
function displayPoster(poster: string): void {
  if (poster != null) {
    const moviePoster = document.createElement('img')
    moviePoster.src = `https://image.tmdb.org/t/p/w200${poster}`
    moviePoster.setAttribute('id', 'poster')
    movieDisplay.appendChild(moviePoster)
  }
}

// Generate Movie Results
const loadMovies = async (searchTerm: string): Promise<void> => {
  try {
    const movieList = await fetchMovieList(searchTerm)
    if (movieList.results.length) {
      displayMovieResults(movieList.results)
    } else {
      // Display fallback image
    }
  } catch (err) {
    console.error(err)
  }
}

// On load
movieSearchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const searchTerm = movieSearchBox.value.trim()
    movieDisplay.innerHTML = ''
    searchMovies(searchTerm)
  }
})
