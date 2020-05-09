import React from "react";

import ReactDOM from "react-dom";

import DetailMovie from "./DetailMovie";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<DetailMovie />, div);

  ReactDOM.unmountComponentAtNode(div);
});
