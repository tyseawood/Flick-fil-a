import './style.css'
import { MovieSearch, Result } from './Movie'

const apiKey = import.meta.env.APP_APIKEY
const errorElement = document.getElementById(
  'err-display-container'
) as HTMLElement
const movieDisplay = document.getElementById(
  'movie-display-container'
) as HTMLElement
const movieSearchBox = document.getElementById(
  'movie-search-box'
) as HTMLInputElement

const fetchMovieList = async (searchTerm: string): Promise<MovieSearch> => {
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
  const movieResp = await fetch(API_URL)
  return (await movieResp.json()) as Promise<MovieSearch>
}

function displayPoster(poster: string): void {
  if (poster != null) {
    const moviePoster = document.createElement('img')
    moviePoster.src = `https://image.tmdb.org/t/p/w200${poster}`
    moviePoster.setAttribute('id', 'poster')
    movieDisplay.appendChild(moviePoster)
  }
}

function displayMovieResults(results: Result[]): void {
  results.forEach(({ poster_path: posterPath }) => {
    displayPoster(posterPath)
  })
}

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

async function searchMovies(e: KeyboardEvent): Promise<void> {
  if (e.key === 'Enter') {
    const searchTerm = movieSearchBox.value.trim()
    movieDisplay.innerHTML = ''

    if (!searchTerm.length) {
      errorElement.innerText = 'Please enter a movie!'
    } else {
      await loadMovies(searchTerm)
      movieSearchBox.value = ''
      errorElement.innerHTML = ''
    }
  }
}

// On load
// eslint-disable-next-line @typescript-eslint/no-misused-promises
movieSearchBox.addEventListener('keypress', searchMovies)
