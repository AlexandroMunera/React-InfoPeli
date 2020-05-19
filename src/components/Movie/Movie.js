import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";


export default function Movie({
  id,
  poster,
  title,
  year,
  vote_average,
  listId,deleteMovie
}) {

  const classes = useStyles();

  const eliminarMovie = () => {
    deleteMovie(id)
  }

 

  return (
    <Card className={classes.item}>
      <CardActionArea>
        <Link to={`/detail/${id}`}>
          <CardMedia className={classes.media} image={poster} title={title} />
        </Link>
        <CardContent className={classes.cardContent}>
          <Typography
            component="p"
            variant="subtitle1"
            style={{ paddingLeft: "2px" }}
          >
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
        </CardContent>
      </CardActionArea>
      
        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {listId && (
          <IconButton aria-label="delete" onClick={eliminarMovie} >
            <DeleteIcon color="error" />
          </IconButton>
          )}
        </CardActions>
      
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  Rating: {
    fontSize: "1rem",
  },
  item: {
    boxSizing: "border-box",
    height: "360px",
    marginBottom: "1em",
    width: "170px",
  },
  media: {
    height: "260px",
  },
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
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
    flexWrap: "wrap",
    justifyContent: "left",
    listStyle: "none",
    margin: 0,
  },
  chip: {
    margin: "1px",
  },
}));
