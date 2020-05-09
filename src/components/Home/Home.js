import { CircularProgress, Container, Fab, Link, Typography, useScrollTrigger, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import BackgroundImage from "../../assets/minionsTransparente.png";
import GenresContext from "../../context/genresContext";
import apiMovies from "../../services/apiMovies";
import DetailMovie from "../DetailMovie/DetailMovie";
import MoviesList from "../MovieList";

function Home(props) {
  const classes = useStyles();
  const { match, location } = props;
  const { params } = match;
  const { genreName } = params;  
  const { movieId } = params;
  const searchText = new URLSearchParams(useLocation().search).get("search")

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState("");
 
  const { genres, setGenres } = useContext(GenresContext);
  

  useEffect(() => {

    console.log('Entre al useEffect de home')    

      let page = 1
      location.search !== '' ? page = location.search.split("/")[1] : page = params.page

      const realizarConsultas = async () => {
      let generos = "";      
      if (genres.length === 0) {
        let res = await apiMovies.getGenres();
        generos = res.genres
        
      } else {
        generos = genres;
      }

      setGenres(generos);      

      if (searchText) {
        document.title = `Info Peli - Buscador`;
        const Search = await apiMovies.searchMovie(searchText.split('/')[0],searchText.split('/')[1]);

        setResults(Search);

        //Volver al inicio de la pagina
        const anchor = document.querySelector("#root");
        if (anchor) {
          anchor.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        setLoading(false);
      }
      else if (genreName !== undefined && movieId === undefined) {
        if (genreName === "Populares") {
          const Search = await apiMovies.getPopularMovies(page);
          setResults(Search);
          setLoading(false);
        } else {
          const generoEncontrado = generos.find((e) => e.name === genreName);

          if (generoEncontrado) {

            const Search = await apiMovies.getMoviesByGenreId(
              generoEncontrado.id,
              page
            );
            setResults(Search);

            //Volver al inicio de la pagina
            const anchor = document.querySelector("#root");
            if (anchor) {
              anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }

            setLoading(false);
          } else {
            // history.push(`/404`);
          }
        }
        document.title = `Info Peli - ${genreName}`;
      }  else if (results === "" || Object.keys(params).length === 0) {
        document.title = `Info Peli - Populares`;

        const Search = await apiMovies.getPopularMovies();
        setResults(Search);
        setLoading(false);
      }
    };
    realizarConsultas();
  }, [props,params]);
  
  function _renderResults() {
    if (results === "") return <></>;

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
          {genreName || "Peliculas"}
        </Typography>
        <MoviesList movies={results}  />
      </>
    );
  }

    return (
      
      <>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div id="back-to-top-anchor" />
        {loading && <CircularProgress />}

        { movieId !== undefined ? <DetailMovie movieId={movieId} /> : _renderResults()}
        

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
    </>
   
   )
}

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.bool,
    path: PropTypes.string,
    ulr: PropTypes.string,
  }),
};

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    
    const anchor = (event.target.ownerDocument || document)
     .querySelector('#back-to-top-anchor');
    if (anchor) {
      
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.rootZoom}
      >
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
    background: "#f5f5f5",
  },
  rootZoom: {
    position: "fixed",
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
    // textAlign: "center"
     flexGrow: 1,
    //padding: theme.spacing(3),
  },
  tituloGenero: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(6),
  },
}));

export default withRouter(Home);
