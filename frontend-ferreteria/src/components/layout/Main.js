import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import Footer from './components/Footer/Footer';
//import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';

import useStyles from './Main.Style';

const Main = props => {
    const { children } = props;

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    return (
        <div className={clsx({ [classes.root]: true, [classes.shiftContent]: isDesktop })}>
            <Topbar/>
            <main className={classes.content}>
                <div className={classes.rootcontainer}>
                    {children}
                </div>
                <Footer />
            </main>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
