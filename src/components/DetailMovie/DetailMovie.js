import {
  Box,
  Card,
  CardMedia,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";
import IMG_NULL from "../../assets/noImg.png";
import { firestore } from "../../firebase";
import apiMovies from "../../services/apiMovies";
import Loader from "../Loader";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import ReactStoreIndicator from "react-score-indicator";
import { Rating } from "@material-ui/lab";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useTranslation } from "react-i18next";

const IMG_URL = "https://image.tmdb.org/t/p/w185"; //Solo renderizar si cambian las peliculas
const PROFIL_IMG_URL = "https://image.tmdb.org/t/p/w185";
const URL_YOUTUBE = "https://www.youtube.com/watch?v=";

function DetailMovie({ movieId, user, width }) {
  const { t, i18n } = useTranslation();

  const [infoMovie, setInfoMovie] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [actores, setActores] = useState([]);
  const [lenguages, setLenguages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [lists, setLists] = useState([]);
  const [listSelected, setListSelected] = useState("");
  const [helperText, sethelperText] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const {
    title,
    poster_path,
    vote_average,
    runtime,
    release_date,
    overview,
  } = infoMovie;

  useEffect(() => {
    console.log("entre a useEffect de detailMovie");
    const realizarConsultas = async () => {
      const infoMovie = await apiMovies.getMovie(movieId);
      setInfoMovie(infoMovie);
      setGeneros(infoMovie.genres);
      setLenguages(infoMovie.spoken_languages);

      const cast = await apiMovies.getMainCast(movieId);
      const actors = cast.cast.map((actor) => {
        let aObj = {};
        aObj["cast_id"] = actor.cast_id;
        aObj["profile_path"] =
          actor.profile_path == null || actor.profile_path === undefined
            ? IMG_NULL
            : PROFIL_IMG_URL + actor.profile_path;
        aObj["name"] = actor.name;
        return aObj;
      });
      setActores(actors);

      const videosAPI = await apiMovies.getTrailer(movieId);
      setVideos(videosAPI);
    };
    realizarConsultas();
  }, [movieId, i18n.language, poster_path, user]);

  const handleChangeList = (event) => {
    setSelectError(false);
    setLoadingList(true);
    const idList = event.target.value;
    setListSelected(idList);

    //Validar que la peli no exista ya en la lista seleccionada
    firestore
      .collection("ListMovies")
      .where("listId", "==", idList)
      .where("movieId", "==", movieId)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          addMovieToList(idList, movieId);
        } else {
          setSelectError(true);
          sethelperText(t("Ya esta en esta lista"));
          setLoadingList(false);
        }
      });
  };

  const handleOpenLists = () => {
    //Consultar las listas del usuario
    setLoadingList(true);

    firestore
      .collection("lists")
      .where("userId", "==", user.uid)
      .get()
      .then(
        (snapshot) => {
          if (snapshot.empty) {
            createDefaultList(user.uid);
          } else {
            let listas = [];
            snapshot.forEach((doc) => {
              let lista = {
                id: doc.id,
                listName: doc.data().listName,
                description: doc.data().description,
              };
              listas.push(lista);
            });

            setLists(listas);
            setLoadingList(false);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };

  const createDefaultList = (userId) => {
    console.log("createDefaultList", userId);
    firestore
      .collection("lists")
      .add({
        listName: t("Favoritas"),
        userId: userId,
        description: t("Estas son mis pelis favoritas"),
      })
      .then(function (doc) {
        let listas = [
          {
            id: doc.id,
            listName: t("Favoritas"),
            description: t("Estas son mis pelis favoritas"),
          },
        ];
        setLists(listas);
        setLoadingList(false);
      })
      .catch(function (error) {
        setSelectError(true);
        sethelperText(error);
        setLoadingList(false);
      });
  };

  const addMovieToList = (idList, movieId) => {
    firestore
      .collection("ListMovies")
      .add({
        listId: idList,
        movieId: movieId,
      })
      .then(function () {
        sethelperText(`${t("Agregada")} 👍`);
        setLoadingList(false);
      })
      .catch(function (error) {
        setSelectError(true);
        sethelperText(error);
        setLoadingList(false);
      });
  };

  function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}h:${m}m`;
  }

  const classes = useStyles();

  const shareUrl = `https://infopeli.web.app/detail/${movieId}`;
  const titleToShare = t(
    "Hola, te recomiendo ver esta película o si quieres ver mas información y crear listas personalizables totalmente gratis, ingresa al sitio web."
  );

  const breakPointsCarouselActors = [
    { width: 1, itemsToShow: 4, itemsToScroll: 4 },
    { width: 550, itemsToShow: 6, itemsToScroll: 4 },
    { width: 850, itemsToShow: 8, itemsToScroll: 4 },
    { width: 1150, itemsToShow: 14, itemsToScroll: 4 },
    { width: 1450, itemsToShow: 18, itemsToScroll: 4 },
    { width: 1750, itemsToShow: 20, itemsToScroll: 4 },
  ];

  if (isWidthUp("sm", width)) {
    return (
      <>
        <Box
          display="flex"
          m={1}
          justifyContent="center"
          bgcolor="background.paper"
        >
          <Box bgcolor="primary.dark">
            {poster_path === undefined || poster_path == null ? (
              <img src={IMG_NULL} alt={title} className={classes.poster} />
            ) : (
              <img
                src={IMG_URL + poster_path}
                alt={title}
                className={classes.poster}
              />
            )}

            {user ? (
              <FormControl
                className={classes.agregarALista}
                error={selectError}
                variant="outlined"
              >
                <InputLabel id="labelSelect">{t("Agregar a")}...</InputLabel>
                <Select
                  id="demo-simple-select-outlined"
                  label="Agregar a ..."
                  labelId="labelSelect"
                  onChange={handleChangeList}
                  onOpen={handleOpenLists}
                  value={listSelected}
                >
                  {lists.map((l) => (
                    <MenuItem key={l.id} value={l.id}>
                      {l.listName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
                {loadingList && <Loader />}
              </FormControl>
            ) : (
              <Typography color="initial" variant="body2" variantMapping="p">
                {t("Registrate para ver tus listas")}
              </Typography>
            )}
          </Box>

          <Box
            bgcolor="primary.main"
            color="white"
            p={1}
            textAlign="left"
            width="100%"
          >
            <Box m={1}>
              <Typography variant="h4" color="textPrimary">
                {title}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <ReactStoreIndicator
                lineWidth={8}
                maxValue={5}
                style={{ margin: "0px 8px" }}
                value={vote_average}
                textStyle={{
                  bottom: "21.25px",
                  color: "white",
                  fontSize: "14px",
                }}
                width={50}
              />

              <Rating
                className={classes.Rating}
                name="rating"
                max={5}
                precision={0.5}
                readOnly
                value={vote_average / 2}
              />
            </Box>

            <Box display="flex" justifyContent="flex-start" m={1}>
              <Typography
                display="block"
                variant="caption"
                color="textPrimary"
                style={{ marginRight: "5px" }}
              >
                {t("Duración")}: {convertMinsToHrsMins(runtime)}
              </Typography>

              <Typography
                display="block"
                variant="caption"
                color="textPrimary"
                style={{ marginRight: "5px" }}
              >
                {t("Lanzamiento")}: {release_date}
              </Typography>

              <Typography display="block" variant="caption" color="textPrimary">
                {t("Lenguages")}:{" "}
                {lenguages.map((l) => (
                  <span style={{ marginRight: "4px" }} key={l.iso_639_1}>
                    {" "}
                    {l.name}
                  </span>
                ))}
              </Typography>
            </Box>

            <Box m={1}>
              <FacebookShareButton
                url={shareUrl}
                quote={titleToShare}
                hashtag={t('Peliculas')}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={titleToShare}
                hashtags={[t('Peliculas')]}
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
            </Box>

            <Box m={1}>
              <Typography variant="subtitle1" color="textPrimary">
                {t("Generos")}:
              </Typography>
              <Typography variant="body2" color="initial">
                {generos.map((g) => (
                  <span key={g.id}> {g.name} </span>
                ))}
              </Typography>
            </Box>

            <Box m={1}>
              <Typography variant="subtitle1" color="textPrimary">
                {t("Resumen")}:
              </Typography>
              <Typography variant="body2" component="p" color="initial">
                {overview}
              </Typography>
            </Box>

            <Box m={1}>
              <Typography variant="subtitle1" color="textPrimary">
                {t("Actores")}:
              </Typography>

              <Carousel
                breakPoints={breakPointsCarouselActors}
                disableArrowsOnEnd
                itemPadding={[0, 10, 0, 0]}
                pagination={false}
                showArrows={false}
              >
                {actores.map((face) => (
                  <Card className={classes.actorCard}>
                    <CardMedia
                      className={classes.imgActor}
                      image={face.profile_path}
                      title={face.name}
                    />
                    <Typography
                      align="center"
                      display="block"
                      variant="caption"
                    >
                      {face.name}
                    </Typography>
                  </Card>
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>

        {videos.length !== 0 && (
          <Box m={1}>
            <Typography className={classes.titleVideos} paragraph variant="h5">
              {t("Videos")}
            </Typography>
            {videos.map((v) => (
              <ReactPlayer
                width="80%"
                className={classes.reproductor}
                key={v.key}
                url={URL_YOUTUBE + v.key}
              />
            ))}
          </Box>
        )}
      </>
    );
  }

  return (
    <>
      <Box
        display="flex"
        m={1}
        justifyContent="center"
        bgcolor="background.paper"
      >
        <Box bgcolor="primary.dark">
          {poster_path === undefined || poster_path == null ? (
            <img src={IMG_NULL} alt={title} className={classes.poster} />
          ) : (
            <img
              src={IMG_URL + poster_path}
              alt={title}
              className={classes.poster}
            />
          )}

          {user ? (
            <FormControl
              className={classes.agregarALista}
              error={selectError}
              variant="outlined"
            >
              <InputLabel id="labelSelect">{t("Agregar a")}...</InputLabel>
              <Select
                id="demo-simple-select-outlined"
                label="Agregar a ..."
                labelId="labelSelect"
                onChange={handleChangeList}
                onOpen={handleOpenLists}
                value={listSelected}
              >
                {lists.map((l) => (
                  <MenuItem key={l.id} value={l.id}>
                    {l.listName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{helperText}</FormHelperText>
              {loadingList && <Loader />}
            </FormControl>
          ) : (
            <Typography color="initial" variant="body2" variantMapping="p">
              {t("Registrate para ver tus listas")}
            </Typography>
          )}
        </Box>

        <Box
          bgcolor="primary.main"
          color="white"
          p={1}
          textAlign="left"
          width="100%"
        >
          <Box m={1}>
            <Typography variant="h4" color="textPrimary">
              {title}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <ReactStoreIndicator
              lineWidth={8}
              maxValue={5}
              style={{ margin: "0px 8px" }}
              value={vote_average}
              textStyle={{
                bottom: "21.25px",
                color: "white",
                fontSize: "14px",
              }}
              width={50}
            />

            <Rating
              className={classes.Rating}
              name="rating"
              max={5}
              precision={0.5}
              readOnly
              value={vote_average / 2}
            />
          </Box>

          <Box m={1}>
            <Typography display="block" variant="caption" color="textPrimary">
              {t("Duración")}: {convertMinsToHrsMins(runtime)}
            </Typography>

            <Typography display="block" variant="caption" color="textPrimary">
              {t("Lanzamiento")}: {release_date}
            </Typography>

            <Typography display="block" variant="caption" color="textPrimary">
              {t("Lenguages")}:{" "}
              {lenguages.map((l) => (
                <span style={{ marginRight: "4px" }} key={l.iso_639_1}>
                  {" "}
                  {l.name}
                </span>
              ))}
            </Typography>
          </Box>

          <Box m={1}>
            <FacebookShareButton
              url={shareUrl}
              quote={titleToShare}
              hashtag={t('Peliculas')}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={titleToShare}
              hashtags={[t('Peliculas')]}            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={titleToShare}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Box>

          <Box m={1}>
            <Typography color="textPrimary" variant="subtitle1">
              {t("Generos")}:
            </Typography>
            <Typography variant="body2" color="initial">
              {generos.map((g) => (
                <span key={g.id}> {g.name} </span>
              ))}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box bgcolor="primary.main" color="white" m={1} p={1} textAlign="left">
        <Box m={1}>
          <Typography color="textPrimary" variant="subtitle1">
            {t("Resumen")}:
          </Typography>
          <Typography variant="body2" component="p" color="initial">
            {overview}
          </Typography>
        </Box>

        <Box m={1}>
          <Typography variant="subtitle1" color="textPrimary">
            {t("Actores")}:
          </Typography>

          <Carousel
            breakPoints={breakPointsCarouselActors}
            disableArrowsOnEnd
            itemPadding={[0, 10, 0, 0]}
            pagination={false}
            showArrows={false}
          >
            {actores.map((face) => (
              <Card className={classes.actorCard}>
                <CardMedia
                  className={classes.imgActor}
                  image={face.profile_path}
                  title={face.name}
                />
                <Typography align="center" display="block" variant="caption">
                  {face.name}
                </Typography>
              </Card>
            ))}
          </Carousel>
        </Box>
      </Box>

      {videos.length !== 0 && (
        <Box m={1}>
          <Typography className={classes.titleVideos} paragraph variant="h5">
            {t("Videos")}
          </Typography>
          {videos.map((v) => (
            <ReactPlayer
              width="100%"
              className={classes.reproductor}
              key={v.key}
              url={URL_YOUTUBE + v.key}
            />
          ))}
        </Box>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  agregarALista: {
    width: "80%",
  },
  actorCard: {
    height: theme.spacing(16),
    width: theme.spacing(11),
  },
  imgActor: {
    height: theme.spacing(14),
  },
  poster: {
    heigth: "264px",
    maxWidth: "155px",
  },
  Rating: {
    fontSize: "1rem",
  },
  reproductor: {
    display: "inline-flex",
  },
  titleVideos: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default withWidth()(DetailMovie);
