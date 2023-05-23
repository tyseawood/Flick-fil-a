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
const movieDisplay = document.getElementById('movie-display-container');
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
// Get Search Term to call API
function findMovies() {
    let searchTerm = movieSearchBox.value.trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }
    else {
        searchList.classList.add('hide-search-list');
    }
}
// Generate Movie Results
function loadMovies(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const api_key = '250b65ac19c1d23b70718726a42ee160';
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`;
        try {
            yield fetch(PROXY_URL + API_URL)
                .then((response) => response.json())
                .then((data) => {
                if (data.page != null) {
                    for (let { poster_path } of data.results) {
                        displayPoster(poster_path);
                    }
                }
            });
        }
        catch (error) {
            console.log('Movie wont load', error);
        }
    });
}
// Get Movie Poster
function displayPoster(poster) {
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
