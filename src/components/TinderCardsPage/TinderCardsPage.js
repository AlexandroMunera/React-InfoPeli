import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../TinderCard/TinderCard";
import data from "./data.js";

import "./SylesTinderCards.css";
import { Box, Typography } from "@material-ui/core";

const to = (i) => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function TinderCardsPage() {
  const [gone] = useState(() => new Set());
  const classes = useStyles();

  const [props, set] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === data.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  return (
    <Box mt={9} width="100%">
      <Typography
        align="center"
        className={classes.tituloList}
        color="textPrimary"
        variant="h4"
      >
        Mis listas
      </Typography>

      <Box
        id="rootCards"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        pt={9}
        width="100%"
      >
        {props.map(({ x, y, rot, scale }, i) => (
          <Card
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            trans={trans}
            data={data}
            bind={bind}
          />
        ))}
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

export default TinderCardsPage;
