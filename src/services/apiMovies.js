const BASE_API = 'https://api.themoviedb.org/3/';
const API_KEY = 'b835070ca3f98419c2433584bf3af7cd';
const API_LANGUAGE = 'es';

class ApiMovies {
  async getPopularMovies() {
    const query = await fetch(`${BASE_API}movie/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=1`);
    const { results } = await query.json();

    // //Recorrer cada pelicula
    // await results.map(async (movie) => {

    //   const detailMovieAPI = await this.getMovie(movie.id);
    //   let genres = detailMovieAPI.genres[0] === undefined ? 'Not register' : detailMovieAPI.genres;
    //   movie.generos = genres.map(g => g.name)


    //   movie.poster = movie.poster_path == null
    //     ? movie.poster_path = IMG_NULL
    //     : IMG_URL + movie.poster_path

    //   // Validar el tamanio del title, no mayor a 28 caracteres
    //   movie.titulo = movie.title.length > 28
    //     ? movie.title.substring(0, 27) + " ..."
    //     : movie.title

    //   movie.anio = new Date(movie.release_date).getFullYear()
    // })

    // return Promise.all(results);

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
    
    return await results;
  }

  async getTrailer(idMovie) {
    const query = await fetch(`${BASE_API}movie/${idMovie}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}`);
    const { results } = await query.json();
    return results;
  }

}

export default new ApiMovies();