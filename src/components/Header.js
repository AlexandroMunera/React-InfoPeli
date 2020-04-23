import { fade, IconButton, InputBase, makeStyles, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useEffect } from 'react';
import apiMovies from '../services/apiMovies';

export default function Head(props) {

  const [inputMovie, setInputMovie] = useState('');

  // De forma similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    document.title = `Las pelis del momento.`;

    //Obtener directamente las peliculas populares
    apiMovies.getPopularMovies()
            .then(Search => {
                props.onResults(Search)
            })
  });

  function _handleSubmit(e) {
    e.preventDefault()

    if(inputMovie !== ''){

      apiMovies.searchMovie(inputMovie)
        .then(results => {
          props.onResults(results)
        })
    }

  }

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={() => console.log('abrir menu')}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Info Peli
          </Typography>
        <div className={classes.search}>
          <InputBase
            placeholder="Ingresa una peli..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setInputMovie(e.target.value)}
          />
          <IconButton
            edge="start"
            className={classes.searchIcon}
            color="inherit"
            aria-label="open drawer"
            onClick={_handleSubmit}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 3,
    textAlign: 'left',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    flexGrow: 2,

    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '85%',
    justifyContent: 'center'
  },
  inputInput: {
    textAlign: 'center',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
