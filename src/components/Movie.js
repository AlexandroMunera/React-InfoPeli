import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


export class Movie extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        year: PropTypes.string,
        poster: PropTypes.string
    }

    render() {
        const { id, poster, title, year } = this.props

        return (
            <Link to={`/detail/${id}`} clasame="card">
                <div clasame="card-image">
                    <figure classame="image">
                        <img
                            alt={title}
                            src={poster}
                        />
                    </figure>
                </div>
                <div clasame="card-content">
                    <div clasame="content">
                            <p className="title is-6">{title}</p>
                            <p className="subtitle is-6">
                                {year}
                            </p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Movie
