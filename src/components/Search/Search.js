import { IconButton, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Animator } from "lottie-react";
import AnimationSearch from "../../assets/animations/animationSearch.json";

// class Movie extends Component {
function Search({history}) {
  const classes = useStyles();

  const [inputMovie, setInputMovie] = useState("");

  function _handleSubmit() {
    if (inputMovie !== "") {
      // loadingValue(true);
      document.activeElement.blur();
      document
        .querySelector("#root")
        .scrollIntoView({ behavior: "smooth", block: "center" });

      history.push(`/peliculas?search=${inputMovie}/1`)
      
    }
  }

  return (
          <div className={classes.search}>
            <IconButton
              edge="start"
              className={classes.searchIcon}
              color="inherit"
              aria-label="open drawer"
              onClick={() => _handleSubmit()}
            >
              {/* <SearchIcon /> */}
            <Animator animationData={AnimationSearch} loop="10" style={{width: "2em", height: "1em"}} />

            </IconButton>
            <InputBase
              onChange={(e) => setInputMovie(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? _handleSubmit(e) : "")}
              placeholder="  Ingresa un peli…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    flexGrow: "2",
    marginLeft: 0,
    marginRight: theme.spacing(1),

    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
}));

export default withRouter(Search)