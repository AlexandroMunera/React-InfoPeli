import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import IMG_NULL from "../assets/noImg.png";
import Movie from "./Movie";

export default function MovieList({ movies }) {
  const IMG_URL = "https://image.tmdb.org/t/p/w342"; //Solo renderizar si cambian las peliculas

  return (
    <Grid container justify="center" style={{ paddingTop: "1%" }}>
      {movies.map((movie) => {
        const poster =
          movie.poster_path == null
            ? (movie.poster_path = IMG_NULL)
            : IMG_URL + movie.poster_path;

        // Validar el tamanio del title, no mayor a 23 caracteres
        movie.title =
          movie.title.length > 23
            ? movie.title.substring(0, 22) + ".."
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
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  genres: PropTypes.array,
};
