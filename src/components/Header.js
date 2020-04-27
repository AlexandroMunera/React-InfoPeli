import {
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
  SwipeableDrawer,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import MenuIcon from "@material-ui/icons/Menu";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import apiMovies from "../services/apiMovies";
import PropTypes from "prop-types";

const drawerWidth = 240;

export default function Header({ container, onResults, genres, actualGenre }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inputMovie, setInputMovie] = useState("");
  const classes = useStyles();
  const theme = useTheme();

  function _handleSubmit() {
    
    if (inputMovie !== "") {
      apiMovies.searchMovie(inputMovie).then((Search) => {
        console.log('Search', Search)
        onResults(Search);
      });
      actualGenre(-1,inputMovie); //Props que se utiliza para mostrar el title en Home.js
    }
  }

  function _handleChangeGenre(idGenre, nameGenre) {
    actualGenre(idGenre,nameGenre);

    //Consultar las peliculas por el genero y enviarlas por props
    apiMovies.getMoviesByGenreId(idGenre).then((Search) => {
      onResults(Search);
    });

    mobileOpen && handleDrawerToggle();
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {genres.map((g) => (
          <ListItem
            button
            key={g.id}
            onClick={() => _handleChangeGenre(g.id, g.name)}
          >
            <ListItemIcon>
              {g.id % 2 === 0 ? <MovieFilterIcon /> : <LocalMoviesIcon />}
            </ListItemIcon>
            <ListItemText primary={g.name} />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam','Favoritos'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0
              ? <RecentActorsIcon /> : <FavoriteIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <MovieFilterIcon style={{ marginRight: "10px" }} fontSize="large" />
          <Typography className={classes.title} variant="h6" noWrap>
            Info Peli
          </Typography>

          <div className={classes.search}>
            <IconButton
              edge="start"
              className={classes.searchIcon}
              color="inherit"
              aria-label="open drawer"
              onClick={() => _handleSubmit()}
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              onChange={(e) => setInputMovie(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? _handleSubmit(e) : "")}
              placeholder="Ingresa una peli…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

Header.propTypes = {
  container: PropTypes.any,
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#1976d2",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 3,
    textAlign: "left",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    flexGrow: "2",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    // pointerEvents: 'none',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "85%",
    justifyContent: "left",
  },
  inputInput: {
    textAlign: "left",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    paddingLeft: `${theme.spacing(2)}px`,
    transition: theme.transitions.create("width"),
    // width: '100%',
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar

  drawerPaper: {
    width: drawerWidth,
  },
}));
