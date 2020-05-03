import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { NotFount } from "./pages/NotFound";
import Home from "./pages/Home";
import { GenresContexProvider } from "./context/genresContext";

class App extends Component {
  render() {
    return (
      <GenresContexProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/404" component={NotFount}></Route>          
            {/* <Route path="/detail/:movieId" component={Detail}></Route> */}
            <Route path="/detail/:movieId" component={Home}></Route>
            <Route path="/:genreName" component={Home}></Route>
            {/* <Route component={NotFount}></Route> */}
          </Switch>
        </div>
      </GenresContexProvider>
    );
  }
}

export default App;
