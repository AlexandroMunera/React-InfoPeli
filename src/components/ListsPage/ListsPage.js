import { Box, Fab, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Home as HomeIcon, Refresh as RefreshIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg";
import { ReactComponent as NoDataIllustration } from "../../illustrations/no-data.svg";
import EmptyState from "../EmptyState";
import ListCard from "../ListCard/ListCard";
import Loader from "../Loader";

function ListsPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [lists, setLists] = useState("");
  const { userId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    console.log("entre a useEffect lists page");

    const realizarConsultas = async () => {
      await firestore
        .collection("users")
        .doc(userId)
        .onSnapshot(
          (snapshot) => {
            setUser(snapshot.data());
          },
          (error) => {
            setError(error);
          }
        );

      await firestore
        .collection("lists")
        .where("userId", "==", userId)
        .get()
        .then(
          (snapshot) => {
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
          },
          (error) => {
            setError(error);
          }
        );

      setLoading(false);
    };

    realizarConsultas();
  }, [userId]);

  if (error) {
    return (
      <EmptyState
        image={<ErrorIllustration />}
        title="No se pudo obtener el usuario"
        description="Ocurrio un problema tratando de obtener tu información"
        button={
          <Fab
            variant="extended"
            color="primary"
            onClick={() => window.location.reload()}
          >
            <Box clone mr={1}>
              <RefreshIcon />
            </Box>
            Reintentar
          </Fab>
        }
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        image={<NoDataIllustration />}
        title="El usuario no existe"
        description="La solicitud de usuario no existe"
        button={
          <Fab variant="extended" color="primary" component={Link} to="/">
            <Box clone mr={1}>
              <HomeIcon />
            </Box>
            Inicio
          </Fab>
        }
      />
    );
  }

  return (
    <Box mt={9}>
      <Typography
        align="center"
        className={classes.tituloList}
        color="textPrimary"
        variant="h4"
      >
        Mis listas
      </Typography>

      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        p={1}
        width="100%"
      >
        {lists !== "" && lists.map((l) => <ListCard key={l.id} list={l} />)}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  tituloList: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
}));

export default ListsPage;
