import React from "react";

import ReactDOM from "react-dom";

import OrderMovies from "./OrderMovies";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<OrderMovies />, div);

  ReactDOM.unmountComponentAtNode(div);
});
