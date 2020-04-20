import React from 'react'
import 'typeface-roboto';
import { Typography } from '@material-ui/core';

const Title = ({children}) => {
    return (
        <Typography variant="h4" component="h2">
            {children}
        </Typography>
    )
}

export default Title


