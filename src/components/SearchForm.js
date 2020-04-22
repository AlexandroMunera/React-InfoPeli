import React, { Component } from 'react';
import { TextField, Button, Icon } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import apiMovies from '../services/apiMovies';

const useStyles = theme => ({
    root: {
        backgroundColor: "red"
    }
});

export class SearchForm extends Component {


    state = {
        inputMovie: ''
    };

    async componentDidMount() {

        await apiMovies.getPopularMovies()
            .then(Search => {
                console.log('Search', Search)
                this.props.onResults(Search)
            })
    };


    _handleSubmit = (e) => {
        e.preventDefault()
        
        const { inputMovie } = this.state

        apiMovies.searchMovie(inputMovie)
            .then(results => {
                 console.log('movies', results)

                this.props.onResults(results)
            })
    }

    _handleChange = (e) => {
        this.setState({
            inputMovie: e.target.value
        })
    }


    render() {
        const classes = useStyles();    
        return (
            <div>
                <TextField
                    id="outlined-search"
                    label="Ingresa una peli..."
                    type="search"
                    variant="outlined"
                    size="small"
                    onChange={this._handleChange}
                    // helperText="Utiliza el formulario para buscar una peli 🎥"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    onClick={this._handleSubmit}
                >
                    Buscar
                </Button>
            </div>
        )
    }
}
export default withStyles(useStyles)(SearchForm);
