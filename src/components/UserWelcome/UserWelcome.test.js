import React from "react";

import ReactDOM from "react-dom";

import UserWelcome from "./UserWelcome";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <UserWelcome
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      contentText=""
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
