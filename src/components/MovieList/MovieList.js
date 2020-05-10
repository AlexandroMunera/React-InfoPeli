import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import IMG_NULL from "../../assets/noImg.png";
import Movie from "../Movie";

function MovieList({ movies, history, location }) {
  const IMG_URL = "https://image.tmdb.org/t/p/w342"; //Solo renderizar si cambian las peliculas
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
  }

  return (
    <>
      {loading && <CircularProgress />}
      {films.total_pages && (
        <>
          <Pagination
            page={pageActual}
            count={films.total_pages}
            color="primary"
            style={{ justifyContent: "center", display: "flex" }}
            onChange={(e, page) => _handleChangePage(page)}
          />

          <Typography variant="caption" color="initial" align="center">
            Se encontraron {films.total_results} pelis
          </Typography>
        </>
      )}

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
                year={new Date(movie.release_date).getFullYear()}
                poster={poster}
                vote_average={movie.vote_average}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.object,
  genres: PropTypes.array,
};

export default withRouter(MovieList);
