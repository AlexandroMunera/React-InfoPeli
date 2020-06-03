import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter, Route } from "react-router-dom";

import TinderCardsPage from "./TinderCardsPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Route path="/TinderCards/test">
        <TinderCardsPage />
      </Route>
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
