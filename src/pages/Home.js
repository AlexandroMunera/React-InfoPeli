import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useContext, useEffect, useState } from "react";
import BackgroundImage from "../assets/minionsTransparente.png";
import Header from "../components/Header";
import MoviesList from "../components/MoviesList";
import GenresContext from "../context/genresContext";
import apiMovies from "../services/apiMovies";

export default function Home(props) {
  const classes = useStyles();

  const [results, setResults] = useState("");
  const [actualGenre, setActualGenre] = useState({id:0,name:'Las del momento'});
  const { genres, setGenres } = useContext(GenresContext);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    document.title = `Info Peli - ${actualGenre.name}`;
    //Obtener directamente las peliculas populares y los generos
    if (results === "") {
      apiMovies.getGenres().then((res) => {
        setGenres(res["genres"]);
        apiMovies.getPopularMovies().then((Search) => {
          Search.results.map((movie) => {
            let generos = [];
            movie.genre_ids.map((genreId) =>
              generos.push({
                id: genreId,
                name: res.genres.filter((g) => g.id === genreId)[0].name,
              })
            );
            return (movie.generos = generos);
          });
          setResults(Search);
        });
      });
    }
  }, [actualGenre,results, setGenres]);

  function _handleResults(movies) {
    //Agregar los generos a las peliculas
    movies.results.map((movie) => {
      let generos = [];
      movie.genre_ids.map((genreId) =>
        generos.push({
          id: genreId,
          name: genres.filter((g) => g.id === genreId)[0].name,
        })
      );
      return (movie.generos = generos);
    });

    setResults(movies);

    //Volver al inicio de la pagina
    const anchor = document.querySelector('#root');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

  }

  function _renderResults() {

    if(results === "") return <></>
    
    return results.length === 0 ? (
      <h2 style={{ marginTop: "5%" }}>
        <span role="img" aria-label="Triste">
          😞
        </span>
        No se encontraron resultados para tu busquedad.
      </h2>
    ) : (
      <>
        <Typography
          align="left"
          variant="h4"
          color="textPrimary"
          className={classes.tituloGenero}
        >
         {actualGenre.name}
        </Typography>
        <MoviesList movies={results} actualGenre={actualGenre} />       
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Header
        genres={genres}
        onResults={_handleResults}
        actualGenre={(idGenre,nameGenre) => setActualGenre(({id: idGenre, name: nameGenre}))}
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {_renderResults()}

        <div>
          <img
            id="imgMinion"
            style={{ width: "50%", paddingTop: "10%" }}
            src={BackgroundImage}
            alt="background"
          />
        </div>

        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">
              <strong>Info Peli</strong>
              <span style={{ margin: "2px" }} role="img" aria-label="Movie">
                🎥
              </span>
              <Link
                color="inherit"
                href="https://www.linkedin.com/in/freud-alexandro/"
              >
                por Freud Munera
              </Link>
            </Typography>
          </Container>
        </footer>
      </main>

      <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>

    </div>
  );
}

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#root');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.rootZoom}>
        {children}
      </div>
    </Zoom>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexDirection: 'column',
    minHeight: "100vh",
    background: '#f5f5f5'
  },
  rootZoom: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2, 1),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  tituloGenero: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(6),
  },
}));
