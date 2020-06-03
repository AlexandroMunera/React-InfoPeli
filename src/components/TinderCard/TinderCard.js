import React from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
import data from "../TinderCardsPage/data.js";
import "../TinderCardsPage/SylesTinderCards.css";

const TinderCard = ({ i, x, y, rot, scale, trans, bind,  }) => {
  const { name, age, distance, text, pics } = data[i];

  return (
    <animated.div
      key={i}data
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className="card">
          <Carousel>
            {pics.map((pic, index) => (
              <img src={pic} key={index} alt="profilePicture" />
            ))}
          </Carousel>
          <h2>{name},</h2>
          <h2>{age}</h2>
          <h5>{distance}</h5>
          <h5>{text}</h5>
        </div>
      </animated.div>
    </animated.div>
  );
};

TinderCard.propTypes = {
  name: string,
  age: number,
  distance: string,
  text: string,
  pics: array
};

export default TinderCard;

