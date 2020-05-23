import React from "react";

import ReactDOM from "react-dom";

import SpeedDials from "./SpeedDials";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<SpeedDials />, div);

  ReactDOM.unmountComponentAtNode(div);

});
