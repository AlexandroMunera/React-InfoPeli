import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Chip,
} from "@material-ui/core";
import { AvatarGroup, Rating } from "@material-ui/lab";
import React, { Component, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiMovies from "../services/apiMovies";
import IMG_NULL from "../assets/noImg.png";
import GenresContext from "../context/genresContext";
import { makeStyles } from "@material-ui/core/styles";

const PROFIL_IMG_URL = "https://image.tmdb.org/t/p/w45";

// class Movie extends Component {
export default function Movie({ id,poster,  title,  year,
  titleFull,  vote_average, actors, genres }) {

  const classes = useStyles();
  
  if (typeof genres === 'undefined') {
    genres = [{id:1,name:'genero prueba desde movie'}]
  }

  if (typeof actors === 'undefined') {
    actors = [{cast_id:1,profile_path:'genero prueba desde movie'}]
  }
  // constructor(props) {
  //   super(props);
  //   this._getData = this._getData.bind(this);
  //   const genresContext = useContext(GenresContext)
  //   console.log('genresContext', genresContext)

  // }

  // state = { genres: [], actors: [] };
  // const [actors, setActors] = useState([])
  // const [genres, setGenres] = useState([])
  // const genresContext = useContext(GenresContext)


//   useEffect(() => {

//         console.log('genresContext', genresContext)


//     const detailMovieAPI = apiMovies.getMovie(id);
//     const mainCastMovieAPI = apiMovies.getMainCast(id);

//     const actores = mainCastMovieAPI.cast.map((actor) => {
//       let aObj = {};
//       aObj["cast_id"] = actor.cast_id;
//       aObj["profile_path"] =
//         actor.profile_path == null
//           ? IMG_NULL
//           : PROFIL_IMG_URL + actor.profile_path;
//       aObj["name"] = actor.name;
//       return aObj;

//     })
//     setGenres(detailMovieAPI.genres.slice(0, 2))
//     setActors(actores)
// });

  // async function _getData(idFilm) {
  //   const detailMovieAPI = await apiMovies.getMovie(idFilm);
  //   // console.log('detailMovieAPI.genres[0]', detailMovieAPI.genres.slice(0,2))
  //   //         var genresConcate = detailMovieAPI.genres[0] === undefined ? 'Not register' : detailMovieAPI.genres[0].name;

  //   //         if (detailMovieAPI.genres[1] !== undefined) {
  //   //             genresConcate = genresConcate + ', ' + detailMovieAPI.genres[1].name;
  //   //         }

  //   const mainCastMovieAPI = await apiMovies.getMainCast(idFilm);

  //   const actores = mainCastMovieAPI.cast.map((actor) => {
  //     let aObj = {};
  //     aObj["cast_id"] = actor.cast_id;
  //     aObj["profile_path"] =
  //       actor.profile_path == null
  //         ? IMG_NULL
  //         : PROFIL_IMG_URL + actor.profile_path;
  //     aObj["name"] = actor.name;
  //     return aObj;
  //   });

  //   setGenres(detailMovieAPI.genres.slice(0, 2))
  //   setActors(actores)
  // }

  // componentDidMount = () => this._getData(id);

    return (
      <Card className={classes.item}>
        <CardActionArea>
          {/* <Link to={`/detail/${id}`} > */}
          <Link to="">
            <CardMedia
              className={classes.media}
              image={poster}
              title={titleFull}
            />
          </Link>
          <CardContent className={classes.cardContent}>
            <Typography component="p" variant="subtitle1">
              {title} ({year})
            </Typography>

            <Rating
              name="rating"
              value={vote_average}
              precision={0.5}
              readOnly
              max={10}
            />

            <div className={classes.divGenres}>
              {genres.map((genre) => {
                return (
                  <li key={genre.id}>
                    <Chip
                      size="small"
                      label={genre.name}
                      className={classes.chip}
                    />
                  </li>
                );
              })}
            </div>

            <Divider className={classes.divider} light />

            <AvatarGroup className={classes.avatarGroup} max={5}>
              {actors.map((face) => (
                <Avatar
                  key={face.cast_id}
                  alt={face.name}
                  src={face.profile_path}
                />
              ))}
            </AvatarGroup>
          </CardContent>
        </CardActionArea>
        {/* <CardActions className={classes.cardActions}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                </CardActions> */}
      </Card>
    );
  }

const useStyles = makeStyles(() => ({
  item: {
    // maxWidth: "600px",
    margin: "1em",
    width: "260px",
    height: "515px",
    boxSizing: "border-box",
  },
  media: {
    height: "350px",
  },
  cardContent: {
    padding: "8px",
    textAlign: "left",
  },
  cardActions: {
    padding: "0px",
  },
  divider: {
    margin: "10px",
  },
  avatarGroup: {
    paddingLeft: "8px",
  },
  divGenres: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
  },
  chip: {
    margin: "1px",
  },
}));
