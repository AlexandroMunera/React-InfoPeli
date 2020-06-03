import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

function OrderMovies({ sortMovies }) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("");

  const changeSortBy = (e) => {
    setSortBy(e.target.value);
    sortMovies(e.target.value);
  };

  return (
    // <ExpansionPanel>
    //   <ExpansionPanelSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //   >
    //     <Typography className={classes.heading}>Ordenar</Typography>
    //   </ExpansionPanelSummary>
    //   <ExpansionPanelDetails>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Ordenar por:
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sortBy}
            onChange={changeSortBy}
            label="Ordenar por"
          >
            <MenuItem value="popularity.desc">Popularidad descendente</MenuItem>
            <MenuItem value="popularity.asc">Popularidad ascendente</MenuItem>
            <MenuItem value="vote_average.desc">
              Valoración descendente
            </MenuItem>
            <MenuItem value="vote_average.asc">Valoración ascendente</MenuItem>
            <MenuItem value="primary_release_date.desc">
              Fecha de estreno descendente
            </MenuItem>
            <MenuItem value="primary_release_date.asc">
              Fecha de estreno ascendente
            </MenuItem>
            <MenuItem value="title.asc">Título (A-Z)</MenuItem>
            <MenuItem value="title.desc">Título (Z-A)</MenuItem>
          </Select>
         </FormControl>
    //   </ExpansionPanelDetails>
    // </ExpansionPanel>
  );
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
}));

export default OrderMovies;
