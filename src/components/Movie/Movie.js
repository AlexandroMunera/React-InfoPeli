import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import ShareIcon from "@material-ui/icons/Share";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function Movie({
  id,
  poster,
  title,
  year,
  vote_average,
  listId,
  deleteMovie,
}) {
  const classes = useStyles();
  const [showShareButtons, setShowShareButtons] = useState(false);

  const eliminarMovie = () => {
    deleteMovie(id);
  };

  const shareUrl = `https://infopeli.web.app/detail/${id}`
  const titleToShare = `Hola, te recomiendo ver la pelicula ${title} o si quieres ver mas información y crear listas personalizables totalmente gratis, ingresa al sitio web.`

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
            className={classes.Rating}
            name="rating"
            max={5}
            precision={0.5}
            readOnly
            value={vote_average/2}
          />
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.cardActions} disableSpacing>
        {showShareButtons ? (
          <>
            <FacebookShareButton
              url={shareUrl}
              quote={titleToShare}
              hashtag="Peliculas"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={titleToShare}
              hashtags={["Información","Peliculas","Movies"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={titleToShare}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </>
        ) : (
          <IconButton onClick={() => setShowShareButtons(true)}>
            <ShareIcon />
          </IconButton>
        )}

        {listId && (
          <IconButton aria-label="delete" onClick={eliminarMovie}>
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
    paddingLeft: "5px",
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
