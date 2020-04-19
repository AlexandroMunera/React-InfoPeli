import React, { Component } from 'react'

const API_KEY = 'e18e73b2'

export class SearchForm extends Component {


    state = {
        inputMovie: ''
    };


    _handleSubmit = (e) => {
        e.preventDefault()
        const { inputMovie } = this.state

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`)
            .then(res => res.json())
            .then(results => {
                const { Search = [] } = results
                this.props.onResults(Search)
            });
    }

    _handleChange = (e) => {
        this.setState({
            inputMovie: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
                <div className="field has-addons">
                    <div className="control">
                        <input
                            onChange={this._handleChange}
                            className="input"
                            type="text"
                            placeholder="Ingresa una peli ..." />
                    </div>
                    <div className="control">
                        <button
                            className="button is-info">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchForm
