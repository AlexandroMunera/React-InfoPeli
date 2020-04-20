import { IconButton, InputBase, Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import apiMovies from '../services/apiMovies';


const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
});

export class SearchForm extends Component {


    state = {
        inputMovie: ''
    };

    async componentDidMount() {

        const Search = await apiMovies.getPopularMovies()
        this.props.onResults(Search)

    };


    _handleSubmit = (e) => {
        e.preventDefault()

        console.log('e', e)

        const { inputMovie } = this.state

        apiMovies.searchMovie(inputMovie)
            .then(results => {
                this.props.onResults(results)
            })
    }

    _handleChange = (e) => {
        this.setState({
            inputMovie: e.target.value
        })
    }


    render() {
        const { classes } = this.props;
        return (

            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Ingresa una peli ..."
                    inputProps={{ 'aria-label': 'Ingresa una peli' }}

                />
                <IconButton 
                    type="submit"
                    className={classes.iconButton} 
                    aria-label="search"
                    onSubmit={this._handleSubmit}>
                    <SearchIcon />
                </IconButton>

                {/* <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <DirectionsIcon />
                </IconButton> */}
            </Paper>
        )
    }
}
export default withStyles(styles)(SearchForm);
