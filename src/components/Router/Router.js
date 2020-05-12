import PropTypes from "prop-types";
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GenresContexProvider } from "../../context/genresContext";
// import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import Home from "../Home";
import NotFoundPage from "../NotFoundPage";
import UserPage from "../UserPage";
import ListsPage from "../ListsPage/ListsPage";
import ListMoviesPage from "../ListMoviesPage/ListMoviesPage";

class Router extends Component {
  render() {
    // Properties
    const { user, roles, bar } = this.props;

    // Functions
    const { openSnackbar } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        {bar}

        <Switch>
          <GenresContexProvider>
            <Route path="/" exact>
              <Home user={user} openSnackbar={openSnackbar} />
            </Route>

            <Route path="/lists/:userId">
              {user ? <ListsPage /> : <Redirect to="/" />}
            </Route>

            <Route path="/list/:listId/:listName">
              {user ? <ListMoviesPage /> : <Redirect to="/" />}
            </Route>

            <Route path="/admin">
              {user && roles.includes("admin") ? (
                <AdminPage />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            <Route path="/user/:userId">
              {user ? <UserPage /> : <Redirect to="/" />}
            </Route>

            <Route path="/peliculas/:genreName/:page" exact>
              <Home user={user} openSnackbar={openSnackbar} />
            </Route>

            <Route path="/peliculas/:genreName" exact>
              <Home user={user} openSnackbar={openSnackbar} />
            </Route>

            <Route path="/peliculas" exact>
              <Home user={user} openSnackbar={openSnackbar} />
            </Route>

            <Route path="/detail/:movieId" component={Home}></Route>

            {/* <Route>
              <NotFoundPage />
            </Route> */}
          </GenresContexProvider>
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  bar: PropTypes.element,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default Router;
