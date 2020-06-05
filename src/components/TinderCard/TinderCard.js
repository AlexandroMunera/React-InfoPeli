import React from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import "../TinderCardsPage/SylesTinderCards.css";

const TinderCard = ({ i, x, y, rot, scale, trans, bind, data  }) => {
  const { id, title, year, voteCount, overview, pics } = data[i];

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
        <Link to={`/detail/${id}`}>
          <Carousel>
            {pics.map((pic, index) => (
              <img src={pic} key={index} alt="profilePicture" />
            ))}
          </Carousel>
        </Link>

          <h2>{title} ({year})</h2>
          <h5>{voteCount} votos</h5>
          <h5>{overview}</h5>
        </div>
      </animated.div>
    </animated.div>
  );
};

TinderCard.propTypes = {
  title: string,
  year: number,
  voteCount: string,
  overview: string,
  pics: array
};

export default TinderCard;

