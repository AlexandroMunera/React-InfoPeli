import { Avatar, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AvatarGroup, Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMG_NULL from "../assets/noImg.png";
import apiMovies from "../services/apiMovies";

const PROFIL_IMG_URL = "https://image.tmdb.org/t/p/w45";

// class Movie extends Component {
export default function Movie({
  id,
  poster,
  title,
  year,
  titleFull,
  vote_average,
  genres,
}) {
  const classes = useStyles();

  const [actors, setActors] = useState([]);

  useEffect(() => {
    const actores = async () => {
      const mainCastMovieAPI = await apiMovies.getMainCast(id);

      const actors =  mainCastMovieAPI.cast.map(
        (actor) => {
          let aObj = {};
          aObj["cast_id"] = actor.cast_id;
          aObj["profile_path"] =
            actor.profile_path === null
              ? IMG_NULL
              : PROFIL_IMG_URL + actor.profile_path;
          aObj["name"] = actor.name;
          return aObj;
        },
        [id]
      );
      setActors(actors);
    };
    actores();
  }, [setActors, id]);

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
          <Typography component="p" variant="subtitle1"
           style={{paddingLeft: '2px'}}>
            {title} ({year})
          </Typography>

          <Rating
            name="rating"
            value={vote_average}
            precision={0.5}
            readOnly
            max={10}
            className={classes.Rating}
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

          <AvatarGroup className={classes.avatarGroup} max={4}>
            {actors.map((face) => (
              <Avatar
                key={face.cast_id}
                alt={face.name}
                src={face.profile_path}
                className={classes.avatar}
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

const useStyles = makeStyles((theme) => ({
  Rating: {
    fontSize: '1rem'
  },
  item: {
    // maxWidth: "600px",
    // margin: "1em",
    width: "170px",
    height: "400px",
    boxSizing: "border-box",
    marginBottom: "1em"
  },
  media: {
    height: "260px",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  cardContent: {
    padding: "4px",
    textAlign: "left",
  },
  cardActions: {
    padding: "0px",
  },
  divider: {
    margin: "10px",
  },
  avatarGroup: {
    paddingLeft: "5px",
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
