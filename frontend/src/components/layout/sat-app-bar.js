import { AppBar, Badge, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../App/styles';
import clsx from 'clsx';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu';
import { drawerOpenState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';

function SatAppBar() {
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState);
    const classes = useStyles();

    function handleDrawerOpen() {
        setDrawerOpen(true);
    }

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>SAT - Sistema de Atendimentos</Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary"><NotificationsIcon /></Badge>
                </IconButton>
                <div className={classes.search}>
                    <div className={classes.searchIcon}><SearchIcon /></div>
                    <InputBase placeholder="Senha…" classes={{ root: classes.searchInputRoot, input: classes.searchInput, }} inputProps={{ 'aria-label': 'senha' }} onClick={e => alert('Pesquisa de senha ainda não implementada!!!' + e.target.value)}/>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default SatAppBar;