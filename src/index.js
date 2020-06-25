import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
import "./index.css";
import './i18n';
import App from "./components/App";

// import * as Sentry from "@sentry/browser";
// Sentry.init({
//   dsn: process.env.REACT_APP_SENTRY_DSN,
//   release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
// });

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
