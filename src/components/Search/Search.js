import { IconButton, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Animator } from "lottie-react";
import AnimationSearch from "../../assets/animations/animationSearch.json";
import { useTranslation } from "react-i18next";

// class Movie extends Component {
function Search({history}) {
  const { t } = useTranslation();
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
              aria-label="open drawer"
              className={classes.searchIcon}
              color="inherit"
              disableFocusRipple
              edge="start"
              onClick={() => _handleSubmit()}
            >
              {/* <SearchIcon /> */}
              <Animator animationData={AnimationSearch} loop="15" style={{width: "2em", height: "1em"}} />

            </IconButton>
            <InputBase
              onChange={(e) => setInputMovie(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? _handleSubmit(e) : "")}
              placeholder={t('Busca aquí...')}
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
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    // pointerEvents: 'none',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  inputRoot: {
    color: "inherit",
    justifyContent: "left",
    width: "55%",
  },
  inputInput: {
    textAlign: "left",
    padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `${theme.spacing(2)}px`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default withRouter(Search)