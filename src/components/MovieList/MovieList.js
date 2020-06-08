import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import IMG_NULL from "../../assets/noImg.png";
import Movie from "../Movie";

function MovieList({ movies, history, location, listId,deleteMovie }) {
  const IMG_URL = "https://image.tmdb.org/t/p/w185";
  const [films, setFilms] = useState(movies);
  const [pageActual, setPageActual] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchText = new URLSearchParams(useLocation().search).get("search");

  useEffect(() => {
    setFilms(movies);
    console.log("entre al useeffect movielist");
    let page = location.pathname.split("/")[3]
      ? location.pathname.split("/")[3]
      : 1;

    if (location.search) page = location.search.split("/")[1];
    setPageActual(parseInt(page));

    setLoading(false);
  }, [movies]);

  function _handleChangePage(page) {
    setLoading(true);

    let genero = location.pathname.split("/")[2]
      ? location.pathname.split("/")[2]
      : "Populares";

    searchText
      ? history.push(`/peliculas?search=${searchText.split("/")[0]}/${page}`)
      : history.push(`/peliculas/${genero}/${page}`);

    setPageActual(page);

    //Regresar el inicio de la pagina
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const eliminarMovie = (idMovie) => {
    deleteMovie(idMovie)
  }

  return (
    <>
      {loading && <CircularProgress />}

      <Grid container justify="center" style={{ paddingTop: "1%" }}>
        {films.results.map((movie) => {
          const poster =
            movie.poster_path == null
              ? (movie.poster_path = IMG_NULL)
              : IMG_URL + movie.poster_path;

          // Validar el tamanio del title, no mayor a 23 caracteres
          movie.title =
            movie.title.length > 11
              ? movie.title.substring(0, 9) + ".."
              : movie.title;

          return (
            <Grid key={movie.id} item>
              <Movie
                id={movie.id}
                title={movie.title}
                year={new Date(movie.release_date).getFullYear()}
                poster={poster}
                vote_average={movie.vote_average}
                deleteMovie={eliminarMovie}
                listId={listId}
              />
            </Grid>
          );
        })}
      </Grid>

     
      {films.total_pages && (
        <>
          <Pagination
            color="primary"
            count={films.total_pages}
            onChange={(e, page) => _handleChangePage(page)}
            page={pageActual}
            style={{ justifyContent: "center", display: "flex" }}
          />

          <Typography variant="caption" color="initial" align="center">
            Se encontraron {films.total_results} pelis
          </Typography>
        </>
      )}
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.object,
  genres: PropTypes.array,
};

export default withRouter(MovieList);
