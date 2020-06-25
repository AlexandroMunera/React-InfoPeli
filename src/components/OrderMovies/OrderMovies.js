import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

function OrderMovies({ sortMovies }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("");

  const changeSortBy = (e) => {
    setSortBy(e.target.value);
    sortMovies(e.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">
        {t("Ordenar por")}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={sortBy}
        onChange={changeSortBy}
        label={t("Ordenar por")}
      >
        <MenuItem value="popularity.desc">{t("Popularidad descendente")}</MenuItem>
        <MenuItem value="popularity.asc">{t("Popularidad ascendente")}</MenuItem>
        <MenuItem value="vote_average.desc">{t("Valoración descendente")}</MenuItem>
        <MenuItem value="vote_average.asc">{t("Valoración ascendente")}</MenuItem>
        <MenuItem value="primary_release_date.desc">
          {t("Fecha de estreno descendente")}
        </MenuItem>
        <MenuItem value="primary_release_date.asc">
          {t("Fecha de estreno ascendente")}
        </MenuItem>
        <MenuItem value="title.asc">{t("Título (A-Z)")}</MenuItem>
        <MenuItem value="title.desc">{t("Título (Z-A)")}</MenuItem>
      </Select>
    </FormControl>
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
