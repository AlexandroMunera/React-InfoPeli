import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

function ListCard({ list, editList, deleteList }) {
  const { id, listName, description } = list;
  const classes = useStyles();

  const editar = () => {
    editList(list);
  };

  const eliminar = () => {
    deleteList(id);
  };

  return (
    <Card className={classes.item}>
      <Link className={classes.link} to={`/list/${id}/${listName}`}>
        <CardActionArea>
          <CardHeader title={`${listName}`} subheader={description} />
        </CardActionArea>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={editar}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={eliminar}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

ListCard.propTypes = {
  list: PropTypes.object.isRequired,
};
const useStyles = makeStyles(() => ({
  item: {
    width: "210px",
    height: "166px",
    boxSizing: "border-box",
    marginBottom: "1em",
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));
export default ListCard;
