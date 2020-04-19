import React, { Component } from 'react'

import Title from '../components/Title'
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';


export default class Home extends Component {

    //state = { usedSearch: false, results: [] }
     state = { usedSearch: true, results: [] }

    _handleResults = (results) => {

      this.setState({ results, usedSearch: true })
    }
  
    _renderResults() {
      return this.state.results.length === 0
        ? <p>Sorry! <span role='img' aria-label="Triste">😞</span> No results found.</p>
        : <MoviesList movies={this.state.results} />
    }

    render() {
        return (
            <div>
                <Title>Info Pelis</Title>
                <div className='SearchForm-wrapper '>
                    <SearchForm onResults={this._handleResults} />
                </div>
                <div className="columns">
                    <div className="column is-2"></div>
                    <div className="column is-8">

                        {
                            this.state.usedSearch
                                ? this._renderResults()
                                : <small>Usa el formulario para buscar una peli
              <span role='img' aria-label="Movie"> 🎥</span></small>
                        }
                    </div>
                    <div className="column is-2"></div>
                </div>
            </div>
        )
    }
}
