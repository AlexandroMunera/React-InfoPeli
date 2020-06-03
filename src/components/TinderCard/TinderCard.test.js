import React from "react";

import ReactDOM from "react-dom";

import TinderCard from "./TinderCard";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<TinderCard />, div);

  ReactDOM.unmountComponentAtNode(div);
});
