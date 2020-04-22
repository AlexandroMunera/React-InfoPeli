import React, { Component } from 'react';
import {
    Card, CardActionArea, CardActions, CardContent,
    CardMedia, IconButton, Typography, withStyles,
    Divider
} from '@material-ui/core';
import { Rating } from '@material-ui/lab'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import apiMovies from '../services/apiMovies';

class Movie extends Component {
    
    constructor(props){
        super(props)
        this._getData = this._getData.bind(this)
    }

    state = {
    }

    async _getData(idFilm) {

        const detailMovieAPI = await apiMovies.getMovie(idFilm);

        var genresConcate = detailMovieAPI.genres[0] === undefined ? 'Not register' : detailMovieAPI.genres[0].name;

        if(detailMovieAPI.genres[1] !== undefined)
        {
          genresConcate = genresConcate + ', ' + detailMovieAPI.genres[1].name;
        }

        this.setState({
              genres: genresConcate                
            })
      }

    componentWillMount = () => this._getData(this.props.id);
    render() {

        const {
            id, poster, title, year, classes, titleFull,
            vote_average
        } = this.props

        return (
            <Card className={classes.item}>
                <CardActionArea>
                    <Link to={`/detail/${id}`} >
                        <CardMedia className={classes.media}
                            image={poster}
                            title={titleFull}
                        />
                    </Link>
                    <CardContent className={classes.cardContent}>
                        <Typography
                            component="p" variant="h6">
                            {title} ({year})
                    </Typography>

                        <Rating name="rating"
                            value={vote_average} precision={0.5}
                            readOnly
                            max={10}
                        />

                        <Divider className={classes.divider} light />

                        <Typography
                            component="p" variant="h6">
                            {this.state.genres}
                        generos
                    </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                </CardActions>
            </Card>
        )
    }
}

export default withStyles({
    item: {
        // maxWidth: "600px",
        margin: "1em",
        width: "352px",
        height: "580px",
        boxSizing: "border-box"
    },
    media: {
        height: "400px"
    },
    cardContent: {
        padding: "5px"
    },
    divider: {
        margin: "10px"
    }

})(Movie)
