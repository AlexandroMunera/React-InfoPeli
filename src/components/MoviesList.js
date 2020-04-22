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
        const IMG_URL = 'https://image.tmdb.org/t/p/w342';
        return (
            <Grid container justify="center"
                style={{ paddingTop: '1%' }}>

                {
                    movies.map(movie => {

                        const poster = movie.poster_path == null
                            ? movie.poster_path = IMG_NULL
                            : IMG_URL + movie.poster_path

                        // Validar el tamanio del title, no mayor a 23 caracteres
                        movie.title = movie.title.length > 23
                            ? movie.title.substring(0, 22) + ".."
                            : movie.title

                        return (
                            <Grid key={movie.id} item>

                                <Movie
                                    id={movie.id}
                                    title={movie.title}
                                    titleFull={movie.title}
                                    year={new Date(movie.release_date).getFullYear()}
                                    poster={poster}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
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
