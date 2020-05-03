import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

// class Movie extends Component {
export default function Movie({
  id,
  poster,
  title,
  year,
  vote_average,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.item}>
      <CardActionArea>
        <Link to={`/detail/${id}`} >
          <CardMedia
            className={classes.media}
            image={poster}
            title={title}
          />
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
    fontSize: "1rem",
  },
  item: {
    // maxWidth: "600px",
    // margin: "1em",
    width: "170px",
    height: "318px",
    boxSizing: "border-box",
    marginBottom: "1em",
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
