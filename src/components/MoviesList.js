import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Movie from './Movie';
import { Grid } from '@material-ui/core';
import IMG_NULL from '../assets/noImg.png'


class MovieList extends Component {

    static propTypes = {
        movies: PropTypes.array
    }

    render() {
        const { movies } = this.props
        const IMG_URL = 'https://image.tmdb.org/t/p/w185';
        console.log('movies', movies)
        return (

            <Grid container justify="center"
                style={{paddingTop: '1%'}}>
                
                {
                movies.map(movie => {

                    const poster = movie.poster_path  == null
                         ? movie.poster_path = IMG_NULL
                         : IMG_URL + movie.poster_path
                         

                    return (
                        <Grid key={movie.id} item>
                            <Movie                                
                                id={movie.id}
                                title={movie.title}
                                year={movie.release_date}
                                poster={poster}
                            />
                        </Grid>
                    );
                }
                )
            }
            </Grid>
        )
    }
}

export default MovieList;
