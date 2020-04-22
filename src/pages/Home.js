import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { SearchForm } from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import BackgroundImage from '../assets/backgroundImage2.jpg'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2, 1),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Home() {
  const classes = useStyles();

  const [results, setResults] = useState([]);
  // const [usedSearch, setUsedSearch] = useState(false);  
  const [usedSearch, setUsedSearch] = useState(true);  

  function _handleResults(movies) {
    setResults(movies)
    setUsedSearch(true)
  }

  function _renderResults() {
    return results.length === 0
      ? <p>Sorry! <span role='img' aria-label="Triste">😞</span> No results found.</p>
      : <MoviesList movies={results} />
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.main}>

        <Typography variant="h4" component="h2">
          Info Peli
        </Typography>

        <SearchForm onResults={_handleResults} />

        
            {
               usedSearch
                ? _renderResults()
                : <small>Usa el formulario para buscar una peli
              <span role='img' aria-label="Movie"> 🎥</span></small>
            }
        
      </div>
{/* 
      <div>
        <img id='imgMinion' style={{ width: '50%', paddingTop: '10%' }} src={BackgroundImage} alt="background" />
      </div> */}

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1"><strong>Info Peli</strong>  <span role='img'
            aria-label="Movie"> 🎥 </span>
            <Link
              color="inherit"
              href="https://www.linkedin.com/in/freud-alexandro/">
              por Freud Munera
            </Link>
          </Typography>
        </Container>
      </footer>

    </div>
  );
}
