import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Movie from './Movie';


class MovieList extends Component {

    constructor(){
        super()
        const footer = document.getElementsByTagName('footer')
        footer[0].classList.remove("footerToEnd");
  
        const divMinion = document.getElementsByClassName('imgMinion')
  
        if (typeof divMinion[0] !== 'undefined') {
            
            divMinion[0].classList.remove('imgMinion')
        }
    }

    static propTypes = {
        movies: PropTypes.array
    }
    

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
