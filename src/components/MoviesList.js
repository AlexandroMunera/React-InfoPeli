import { createMuiTheme, Grid, ThemeProvider, Typography, CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import IMG_NULL from "../assets/noImg.png";
import GenresContext from "../context/genresContext";
import apiMovies from "../services/apiMovies";
import Movie from "./Movie";
import { withRouter } from "react-router-dom";

function MovieList({ movies, history,location}) {
  const IMG_URL = "https://image.tmdb.org/t/p/w342"; //Solo renderizar si cambian las peliculas
  const { genres } = useContext(GenresContext);
  const [films, setFilms] = useState(movies)
  const [pageActual, setPageActual] = useState(1)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Entre al useEffect MoviesList cuando movies cambien')
    setFilms(movies)
    setPageActual(1)
  }, [movies]);

  function _handleChangePage(page){
    setLoading(true)

    console.log("objeto location en movieslist", location);

    console.log('a la pagina', page)
    let genero = location.pathname.split('/')[1] 
                  ? location.pathname.split('/')[1]
                  : "Populares"
    
     console.log("el genero que cambie es ", genero);

    history.push(`/${genero}/${page}`)

    // if (actualGenre.id === -1) {
    //   apiMovies.searchMovie(actualGenre.name, page).then((Search) => {
    //     Search.results.map((movie) => {
    //       let generos = [];
    //       movie.genre_ids.map((genreId) =>
    //         generos.push({
    //           id: genreId,
    //           name: genres.filter((g) => g.id === genreId)[0].name,
    //         })
    //       );
    //       return (movie.generos = generos);
    //     });
    //     setFilms(Search)
    //     setLoading(false)

    //   });
    // }else if (actualGenre.id === 0) {
    //   apiMovies.getPopularMovies(page).then((Search) => {
    //     Search.results.map((movie) => {
    //       let generos = [];
    //       movie.genre_ids.map((genreId) =>
    //         generos.push({
    //           id: genreId,
    //           name: genres.filter((g) => g.id === genreId)[0].name,
    //         })
    //       );
    //       return (movie.generos = generos);
    //     });
    //     setFilms(Search)
    //     setLoading(false)

  
    //   });
    // }else{
      
    // }

    setPageActual(page)

  }
  
  return (
    <ThemeProvider theme={theme}>
          {loading && <CircularProgress />}

      <Pagination
      page={pageActual}
        count={films.total_pages}
        color="primary"
        // showFirstButton
        // showLastButton
        style={{ justifyContent: "center", display: "flex" }}
        onChange={(e,page) => _handleChangePage(page) }
      />
      <Typography variant="caption" color="initial" align="center">
        Se encontraron {films.total_results} pelis
      </Typography>
      <Grid container justify="space-around" style={{ paddingTop: "1%" }}>
        {films.results.map((movie) => {
          const poster =
            movie.poster_path == null
              ? (movie.poster_path = IMG_NULL)
              : IMG_URL + movie.poster_path;

          // Validar el tamanio del title, no mayor a 23 caracteres
          movie.title =
            movie.title.length > 13
              ? movie.title.substring(0, 11) + ".."
              : movie.title;

          return (
            <Grid key={movie.id} item>
              <Movie
                id={movie.id}
                title={movie.title}
                titleFull={movie.title}
                year={new Date(movie.release_date).getFullYear()}
                poster={poster}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                genres={movie.generos.slice(0, 2)}
              />
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}

MovieList.propTypes = {
  movies: PropTypes.object,
  genres: PropTypes.array,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export default withRouter(MovieList)