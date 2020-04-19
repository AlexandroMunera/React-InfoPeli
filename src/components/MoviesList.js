import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Movie from './Movie';


class MovieList extends Component {

    static propTypes = {
        movies: PropTypes.array
    }

    componentDidMount = () => {
      const footer = document.getElementsByTagName('footer')
      footer[0].classList.remove("footerToEnd");

      const divMinion = document.getElementsByClassName('imgMinion')
      divMinion[0].classList.remove('imgMinion')
    };
    

    render() {
        const { movies } = this.props


        return (

            <div className="MoviesList">
                {
                    movies.map(movie => {

                        return (
                            <div key={movie.imdbID} className="MoviesList-item">
                                <Movie
                                    id={movie.imdbID}
                                    title={movie.Title}
                                    year={movie.Year}
                                    poster={movie.Poster}
                                />
                            </div>

                        );
                    }
                    )
                }
            </div>
        )
    }
}

export default MovieList;
