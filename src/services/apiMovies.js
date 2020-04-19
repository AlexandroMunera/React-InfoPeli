const BASE_API = 'https://api.themoviedb.org/3/';
const API_KEY = 'b835070ca3f98419c2433584bf3af7cd';
const API_LANGUAGE = 'es';

class ApiMovies {

  async getPopularMovies() {
    const query = await fetch(`${BASE_API}movie/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=1`);
    const { results } = await query.json();
    return results;
  } 

  async getMovie(idMovie) {
    const query = await fetch(`${BASE_API}movie/${idMovie}?api_key=${API_KEY}&language=${API_LANGUAGE}`);
    return await query.json();
  }

  async getMainCast(idMovie) {
    const query = await fetch(`${BASE_API}movie/${idMovie}/credits?api_key=${API_KEY}`);
    return await query.json();
  }

  async searchMovie(text) {
    const query = await fetch(`${BASE_API}search/movie?api_key=${API_KEY}&query=${text}&page=1`);
    const { results } = await query.json();
    return results;
  }

  async getTrailer(idMovie) {
    const query = await fetch(`${BASE_API}movie/${idMovie}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}`);
    const { results } = await query.json();
    return results;
  }

}

export default new ApiMovies();