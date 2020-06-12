import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 0
    },
    content: {
        height: '100%'
    },
    rootcontainer: {
        padding: theme.spacing(3)
    }
}));

export default useStyles;