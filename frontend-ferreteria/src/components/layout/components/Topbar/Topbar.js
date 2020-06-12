import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './Topbar.Style';


const Topbar = props => {

    const { className, onSidebarOpen, ...rest } = props;
    const classes = useStyles();

    return (
        <AppBar {...rest} className={clsx(classes.root, className)}>
            <Toolbar>
                <RouterLink to="/">
                    <img alt="Ferretería" src="/images/banner.png" className={classes.icon}/>
                </RouterLink>
                <div className={classes.flexGrow} />
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;
