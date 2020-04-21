import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Card, CardMedia, CardContent, Typography, CardActions, IconButton, Button, CardActionArea } from '@material-ui/core';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
function Movie({ id, poster, title, year, classes }) {
    return (
        <Card className={classes.item}>
            <CardActionArea>
                <Link to={`/detail/${id}`} clasame="card">
                    <CardMedia className={classes.media}
                        image={poster}
                        title={title}
                    />
                </Link>
                <CardContent>
                    <Typography component="span" variant="h6">
                        {title}
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

export default withStyles({
    item: {
        // maxWidth: "600px",
        margin: "1em",
        width: "300px",
        height: "520px",
        boxSizing: "border-box"
    },
    media: {
        height: "400px"
    }
})(Movie)
