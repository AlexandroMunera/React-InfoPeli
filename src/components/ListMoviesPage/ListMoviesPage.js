import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { Grid, Fab, Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Refresh as RefreshIcon, Home as HomeIcon } from "@material-ui/icons";

import { firestore } from "../../firebase";

import EmptyState from "../EmptyState";

import Loader from "../Loader";

import ListCard from "../ListCard/ListCard";

import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg";
import { ReactComponent as NoDataIllustration } from "../../illustrations/no-data.svg";
import MovieList from "../MovieList";
import apiMovies from "../../services/apiMovies";

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
            snapshot.forEach((doc) => {
              filmIds.push(doc.data().movieId);
            });
          },
          (error) => {
            setError(error);
          }
        );

    //Por cada movidId consultar la informacion     
      let resultados = []
      const getData = async () => {
        return Promise.all(     filmIds.map( async (filmId) =>  {
          const { id,title,release_date,poster_path,vote_average } = await apiMovies.getMovie(filmId)
    
          resultados.push({
            "id": id,
            "title": title,
            "release_date": release_date,
            "poster_path": poster_path,
            "vote_average": vote_average
          })
        }))
      }
      
      getData().then( () => {
        const films = {
          "total_results": filmIds.length,
          "results": resultados
          }

          setMovies(films)
          setLoading(false)
      })

    }

    realizarConsultas();

  }, [listId]) 


  if (error) {
    return (
      <EmptyState
        image={<ErrorIllustration />}
        title="No se pudo obtener las pelis"
        description="Ocurrio un problema tratando de obtener la información"
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

      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        p={1}
        
      >
        {loading && <Loader />}
        {movies === "" && <></>}
        {movies.length !== 0 && <MovieList movies={movies}  />}     

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
