import { Link, Typography } from '@material-ui/core';
import React from 'react';

function Rodape() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">Sistema de Atendimentos</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Rodape;