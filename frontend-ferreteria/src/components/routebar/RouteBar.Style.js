import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: theme.spacing(0),
        padding: theme.spacing(1),
        backgroundColor: '#EEECEA',
        position: 'relative',
    },
    link: {
        display: 'flex',
    },
    linkLabel: {
        marginTop:  theme.spacing(0.2),
    },
    icon: {
        marginRight: theme.spacing(1),
        width: 20,
        height: 20,
    },
}));

export default useStyles;