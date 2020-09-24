import { Divider, Drawer, IconButton, List } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import useStyles from '../App/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Collapse from '@material-ui/core/Collapse';
import ListAltOutlined from '@material-ui/icons/ListAltOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Today from '@material-ui/icons/Today';
import { Link } from 'react-router-dom';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import ListAltSharp from '@material-ui/icons/ListAltSharp';
import { drawerOpenState, selectedMenuIndexState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';

function SatDrawer() {
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState);
    const [selectedMenuIndex, setSelectedMenuIndex] = useRecoilState(selectedMenuIndexState);
    const [gruposServicosOpen, setGruposServicosOpen] = useState(false);
    const [servicosOpen, setServicosOpen] = useState(false);
    const classes = useStyles();

    const handleListItemClick = (event, index) => {
        setSelectedMenuIndex(index);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const PersistentDrawer = React.forwardRef(
        (props, ref) => (
            <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose) }} open={drawerOpen} >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    <Divider />
                    <ListItem button selected={selectedMenuIndex === 0} onClick={e => handleListItemClick(e, 0)} component={ps => <Link {...ps} to="/triagem" />}>
                        <ListItemIcon>
                            <SupervisorAccount color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Triagem" />
                    </ListItem>
                    <ListItem button selected={selectedMenuIndex === 1} onClick={e => handleListItemClick(e, 1)} component={ps => <Link {...ps} to="/atendimento" />}>
                        <ListItemIcon>
                            <SupervisorAccount color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Atendimento" />
                    </ListItem>
                    <ListItem button selected={selectedMenuIndex === 2} onClick={e => handleListItemClick(e, 2)} component={ps => <Link {...ps} to="/agendamento" />}>
                        <ListItemIcon>
                            <Today color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Agendamento" />
                    </ListItem>
                    <Divider />
                    <ListItem button selected={selectedMenuIndex === 3} onClick={e => handleListItemClick(e, 3)} component={ps => <Link {...ps} to="/dashboard" />}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <ListSubheader inset color="primary">Cadastros</ListSubheader>
                    <ListItem button selected={selectedMenuIndex === 4} onClick={e => { handleListItemClick(e, 4); setGruposServicosOpen(!gruposServicosOpen); }}>
                        <ListItemIcon>
                            <ListAltSharp color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Grupos Serviços" />
                        {gruposServicosOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                    </ListItem>
                    <Collapse in={gruposServicosOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} selected={selectedMenuIndex === 5} onClick={e => handleListItemClick(e, 5)}>
                                <ListItemIcon>
                                    <AddCircleOutline color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Novo" />
                            </ListItem>
                            <ListItem button className={classes.nested} selected={selectedMenuIndex === 6} onClick={e => handleListItemClick(e, 6)} component={ps => <Link {...ps} to="/grupos-servicos" />}>
                                <ListItemIcon>
                                    <ListAltOutlined color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Listagem" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button selected={selectedMenuIndex === 7} onClick={e => { handleListItemClick(e, 7); setServicosOpen(!servicosOpen); }}>
                        <ListItemIcon>
                            <ListAltSharp color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Serviços" />
                        {servicosOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                    </ListItem>
                    <Collapse in={servicosOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} selected={selectedMenuIndex === 8} onClick={e => handleListItemClick(e, 8)}>
                                <ListItemIcon>
                                    <AddCircleOutline color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Novo" />
                            </ListItem>
                            <ListItem button className={classes.nested} selected={selectedMenuIndex === 9} onClick={e => handleListItemClick(e, 9)}>
                                <ListItemIcon>
                                    <ListAltOutlined color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Listagem" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <Divider />
                    <ListSubheader inset color="primary">Monitoramento</ListSubheader>
                    <ListItem button selected={selectedMenuIndex === 10} onClick={e => handleListItemClick(e, 10)} component={ps => <Link {...ps} to="/dashboard" />}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Atendimentos" />
                    </ListItem>
                    <ListItem button selected={selectedMenuIndex === 11} onClick={e => handleListItemClick(e, 11)} component={ps => <Link {...ps} to="/dashboard" />}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Atendentes" />
                    </ListItem>
                    <ListItem button selected={selectedMenuIndex === 12} onClick={e => handleListItemClick(e, 12)} component={ps => <Link {...ps} to="/dashboard" />}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Serviços" />
                    </ListItem>
                </List>
            </Drawer>
        )
    );

    return (<PersistentDrawer />);
}

export default SatDrawer;