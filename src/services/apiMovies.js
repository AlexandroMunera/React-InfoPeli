import i18n from "i18next";

//Documentation:  https://developers.themoviedb.org/3/getting-started/introduction
const BASE_API = "https://api.themoviedb.org/3/";
const API_KEY = "b835070ca3f98419c2433584bf3af7cd";
const INCLUDE_ADULTE = false;

const ApiMovies = {};

ApiMovies.getMovisSortedBy = async (sortBy, page = 1) => {
  const API_LANGUAGE =
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en";

  const query = await fetch(
    `${BASE_API}discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&sort_by=${sortBy}&include_adult=${INCLUDE_ADULTE}&page=${page}`
  );
  return await query.json();
};

ApiMovies.getMovie = async (idMovie) => {
  const API_LANGUAGE =
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en";

  const query = await fetch(
    `${BASE_API}movie/${idMovie}?api_key=${API_KEY}&language=${API_LANGUAGE}`
  );
  return await query.json();
};

ApiMovies.getMainCast = async (idMovie) => {
  const query = await fetch(
    `${BASE_API}movie/${idMovie}/credits?api_key=${API_KEY}`
  );
  return await query.json();
};

ApiMovies.searchMovie = async (text, page = 1) => {
  const query = await fetch(
    `${BASE_API}search/movie?api_key=${API_KEY}&query=${text}&page=${page}`
  );
  return await query.json();
};

ApiMovies.getTrailer = async (idMovie) => {
  const API_LANGUAGE =
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en";

  const query = await fetch(
    `${BASE_API}movie/${idMovie}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}`
  );
  const { results } = await query.json();
  return results;
};

ApiMovies.getGenres = async () => {
  const API_LANGUAGE =
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en";

  const query = await fetch(
    `${BASE_API}genre/movie/list?api_key=${API_KEY}&language=${API_LANGUAGE}`
  );
  return await query.json();
};

ApiMovies.getMoviesByGenreId = async (id, page, sortBy) => {
  const API_LANGUAGE =
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en";

  const query = await fetch(
    `${BASE_API}discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&sort_by=${sortBy}&include_adult=${INCLUDE_ADULTE}&with_genres=${id}&page=${page}`
  );
  return await query.json();
};

ApiMovies.getTopRated = async (page = 1) => {
  const API_LANGUAGE =
    i18n.language ||
    (typeof window !== "undefined" && window.localStorage.i18nextLng) ||
    "en";
  const query = await fetch(
    `${BASE_API}movie/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`
  );
  return await query.json();
};

export default ApiMovies;
