import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        alignContent: 'center', 
        backgroundColor: 'red',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));

export default useStyles;