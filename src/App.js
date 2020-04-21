import React, { Component } from 'react';
import './App.css';
import Detail from './pages/Detail';
import { Switch, Route } from 'react-router-dom'
import { NotFount } from './pages/NotFound';
import Home from './pages/Home';
// import BackgroundImage from './assets/backgroundImage2.jpg'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/detail/:movieId' component={Detail}></Route>
          <Route component={NotFount}></Route>

        </Switch>

      {/* <div className='imgMinion'>

        <img  id='imgMinion' style= {{width: '50%'}} src={BackgroundImage} alt="background"/>
      </div> */}

        {/* <footer className="footer footerToEnd">
          <div className="content has-text-centered">
            <p>
              <strong>Info Peli</strong>  <span role='img'
               aria-label="Movie"> 🎥 </span> por
                <a href="https://www.linkedin.com/in/freud-alexandro/"> Freud Munera
                </a>.
            </p>
          </div>
        </footer> */}

      </div>
    );
  }
}

export default App;