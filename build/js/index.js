var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import '/build/css/style.css';
import { api_key } from './key';
import { PROXY_URL } from './key';
const movieDisplay = document.getElementById('movie-display-container');
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
let searchTerm = movieSearchBox.value.trim();
// Get Search Term to call API
function searchMovies(searchTerm) {
    if (searchTerm.length > 0) {
        fetchMovieList();
        loadMovies();
        searchTerm = '';
    }
}
// API Call
const fetchMovieList = () => __awaiter(void 0, void 0, void 0, function* () {
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`;
    const movieResp = yield fetch(PROXY_URL + API_URL);
    return yield movieResp.json();
});
// Get Movie Poster
function displayPoster(poster) {
    if (poster != null) {
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w200${poster}`;
        moviePoster.setAttribute('id', 'poster');
        movieDisplay.appendChild(moviePoster);
    }
}
// Generate Movie Results
const loadMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieList = yield fetchMovieList();
        if (movieList.page != null) {
            for (let { poster_path } of movieList.results) {
                displayPoster(poster_path);
                searchTerm = '';
            }
        }
    }
    catch (err) {
        console.error(err);
    }
});
// On load
movieSearchBox.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        movieDisplay.innerHTML = '';
        searchMovies(searchTerm);
    }
});
