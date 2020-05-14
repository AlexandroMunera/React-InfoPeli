import { Box, Fab, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Refresh as RefreshIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg";
import apiMovies from "../../services/apiMovies";
import EmptyState from "../EmptyState";
import Loader from "../Loader";
import MovieList from "../MovieList";

function ListMoviesPage() {
  const { listId, listName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState("");

  const classes = useStyles();

  useEffect(() => {
    console.log("entre a useEffect ListMoviesPage");

    const realizarConsultas = async () => {
      //Obtener los moviesIds de la lista que selecciono
      let filmIds = [];
      await firestore
        .collection("ListMovies")
        .where("listId", "==", listId)
        .get()
        .then(
          (snapshot) => {
            if (snapshot.empty) {
              setError(
                "Tu lista esta vacia, visita el detalle de una pelicula y agregala a tus listas"
              );
            } else {
              snapshot.forEach((doc) => {
                filmIds.push(doc.data().movieId);
              });
            }
          },
          (error) => {
            setError(error);
          }
        );

      //Por cada movidId consultar la informacion
      let resultados = [];
      const getData = async () => {
        return Promise.all(
          filmIds.map(async (filmId) => {
            const {
              id,
              title,
              release_date,
              poster_path,
              vote_average,
            } = await apiMovies.getMovie(filmId);

            resultados.push({
              id: id,
              title: title,
              release_date: release_date,
              poster_path: poster_path,
              vote_average: vote_average,
            });
          })
        );
      };

      getData().then(() => {
        const films = {
          total_results: filmIds.length,
          results: resultados,
        };

        setMovies(films);
        setLoading(false);
      });
    };

    realizarConsultas();
  }, [listId]);

  if (error) {
    return (
      <EmptyState
        image={<ErrorIllustration />}
        title="Ups !"
        description={error}
        button={
          <Fab
            variant="extended"
            color="primary"
            onClick={() => window.location.reload()}
          >
            <Box clone mr={1}>
              <RefreshIcon />
            </Box>
            Reintentar
          </Fab>
        }
      />
    );
  }

  return (
    <Box mt={9} width="100%">
      <Typography
        align="center"
        className={classes.tituloList}
        color="textPrimary"
        variant="h4"
      >
        {listName}
      </Typography>

      <Box display="flex" justifyContent="space-around" flexWrap="wrap" p={1}>
        {loading && <Loader />}
        {movies === "" && <></>}
        {movies.length !== 0 && <MovieList movies={movies} />}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  tituloList: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
}));

export default ListMoviesPage;
