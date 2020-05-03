import {
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useContext, useEffect, useState } from "react";
import BackgroundImage from "../assets/minionsTransparente.png";
import Header from "../components/Header";
import MoviesList from "../components/MoviesList";
import GenresContext from "../context/genresContext";
import apiMovies from "../services/apiMovies";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.bool,
    path: PropTypes.string,
    ulr: PropTypes.string,
  }),
};

function Home(props) {
  const classes = useStyles();

  const { match, history, location } = props;
  const { params } = match;
  const { genreName } = params;

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState("");
  const [actualGenre, setActualGenre] = useState({
    id: 0,
    name: "Populares",
  });
  const { genres, setGenres } = useContext(GenresContext);

  useEffect(() => {

    console.log("Y los parametros url son", params);
    console.log("objeto match", match);
    console.log("objeto location", location);

    let page =  location.pathname.split('/')[2] 
                   ? location.pathname.split('/')[2] : 1
    
     if(location.search) page = location.search.split('/')[1]

    console.log("la page seleccionada es ", page);

    if (genreName !== undefined) {
      console.log('genreName diferente de undfined')
      
      if (genres.length === 0) {
        console.log("necesario consultar los generos");
        apiMovies.getGenres().then((res) => {
          setGenres(res["genres"]);
          //Validar si existe un genero con el nombre de la url
          if(genreName === "Populares"){
            
            apiMovies.getPopularMovies(page).then((Search) => {
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
              setLoading(false);
    document.title = `Info Peli - ${genreName}`;

            });
          }else{
            res["genres"].map((g) => {
            if (g.name === genreName) {
              console.log("Encontre el genero y el id es: ", g);
              
              //Buscar por genero con el id
              apiMovies.getMoviesByGenreId(g.id,page).then((Search) => {
                //Agregar los generos a las peliculas
                Search.results.map((movie) => {
                  let generos = [];
                  movie.genre_ids.map((genreId) =>
                    generos.push({
                      id: genreId,
                      name: res["genres"].filter((g) => g.id === genreId)[0]
                        .name,
                    })
                  );
                  return (movie.generos = generos);
                });

                setResults(Search);
    document.title = `Info Peli - ${g.name}`;


                //Volver al inicio de la pagina
                const anchor = document.querySelector("#root");
                if (anchor) {
                  anchor.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }

                setLoading(false);
              });
            }
          });
        }
        });
      } else {
        console.log("No necesario consultar los generos");

        if(genreName === "Populares"){
          
          apiMovies.getPopularMovies(page).then((Search) => {
            console.log('Search', Search)
            Search.results.map((movie) => {
              let generos = [];
              movie.genre_ids.map((genreId) =>
                generos.push({
                  id: genreId,
                  name: genres.filter((g) => g.id === genreId)[0].name,
                })
              );
              return (movie.generos = generos);
            });
            setResults(Search);
            document.title = `Info Peli - ${genreName}`;
            console.log('Valor loading', loading)
            setLoading(false);

          });
        }else{
        //Validar si existe un genero con el nombre de la url
        genres.map((g) => {
          if (g.name === genreName) {
            console.log("Encontre el genero en los  ya existentes y el id es: ", g);
            
            //Buscar por genero con el id
            apiMovies.getMoviesByGenreId(g.id,page).then((Search) => {
              //Agregar los generos a las peliculas
              Search.results.map((movie) => {
                let generos = [];
                movie.genre_ids.map((genreId) =>
                  generos.push({
                    id: genreId,
                    name: genres.filter((g) => g.id === genreId)[0].name,
                  })
                );
                return (movie.generos = generos);
              });

              setResults(Search);


              //Volver al inicio de la pagina
              const anchor = document.querySelector("#root");
              if (anchor) {
                anchor.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }

              document.title = `Info Peli - ${g.name}`;
              setLoading(false);
            });
          
          }
        });

      }
      }
      

    } else if (location.search) {
      location.search &&
        console.log(
          "Use la caja de busqueda",
          location.search.slice(1, location.search.length)
        );
      console.log("genres", genres);

      document.title = `Info Peli - Buscador`;
      setActualGenre(-1, 'Búsquedas encontradas');

      if (genres.length === 0) {
        console.log("necesario consultar los generos");
        apiMovies.getGenres().then((res) => {
          setGenres(res["genres"]);
              apiMovies
                .searchMovie(location.search.split('/')[0].slice(1, location.search.length),page)
                .then((Search) => {
                  //Agregar los generos a las peliculas
                  Search.results.map((movie) => {
                    let generos = [];
                    movie.genre_ids.map((genreId) =>
                      generos.push({
                        id: genreId,
                        name: res["genres"].filter((g) => g.id === genreId)[0]
                          .name,
                      })
                    );
                    return (movie.generos = generos);
                  });

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
                });
            }
          
        );
      } else {
        console.log('location.search.slice(1, location.search.length)', location.search.split('/')[0].slice(1, location.search.length))
        apiMovies
          .searchMovie(location.search.split('/')[0].slice(1, location.search.length),page)
          .then((Search) => {
            //Agregar los generos a las peliculas
            Search.results.map((movie) => {
              let generos = [];
              movie.genre_ids.map((genreId) =>
                generos.push({
                  id: genreId,
                  name: genres.filter((g) => g.id === genreId)[0].name,
                })
              );
              return (movie.generos = generos);
            });

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
          });
      }
    } else if (results === "" || Object.keys(params).length === 0) {
      console.log('results === ""')
    document.title = `Info Peli - Populares`;

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
          setLoading(false);
        });
      });
    }
  }, [props]);

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
          {genreName || "Búsquedas encontradas"}
        </Typography>
        <MoviesList movies={results} actualGenre={actualGenre} />
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header
          genres={genres}
          loadingValue={(loadingValue) => setLoading(loadingValue)}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {loading && <CircularProgress />}

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
    </ThemeProvider>
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
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#root"
    );
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
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  tituloGenero: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(6),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export default withRouter(Home);
