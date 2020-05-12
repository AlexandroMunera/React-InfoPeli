import React from "react";

import PropTypes from "prop-types";

import { Card, CardHeader, CardActionArea } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

function ListCard({ list }) {
  const { id, listName, description } = list;
  const classes = useStyles();

  return (
    <Card className={classes.item}>
      <Link className={classes.link} to={`/list/${id}/${listName}`} >
        <CardActionArea>
          <CardHeader title={`${listName}`} subheader={description} />
        </CardActionArea>
      </Link>
    </Card>
  );
}

ListCard.propTypes = {
  list: PropTypes.object.isRequired,
};
const useStyles = makeStyles((theme) => ({
  item: {
    width: "210px",
    height: "117px",
    boxSizing: "border-box",
    marginBottom: "1em",
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit'
  }
}));
export default ListCard;
