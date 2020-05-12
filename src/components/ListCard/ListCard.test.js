import React from "react";

import ReactDOM from "react-dom";

import ListCard from "./ListCard";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ListCard user={{}} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
