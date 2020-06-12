import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import useStyles from './RouteBar.Style';

const RouteBar = ({ routes }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                {routes.map((item, index) => {
                    if(item.url !== null && typeof item.url === "string"){
                        return (
                            <Link key={index} color="inherit" href={item.url} className={classes.link}>
                                <Icon className={classes.icon}>{item.icon}</Icon>
                                <div className={classes.linkLabel}>{item.name}</div>
                            </Link>
                        );
                    }else{
                        return (
                            <Typography key={index} color="textPrimary" className={classes.link}>
                                <Icon className={classes.icon}>{item.icon}</Icon>
                                <span className={classes.linkLabel}>{item.name}</span>
                            </Typography>
                        );
                    }
                })}
            </Breadcrumbs>
        </Card>
    );
};

export default RouteBar;