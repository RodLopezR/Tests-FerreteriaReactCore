import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Roboto',
        color: '#546e7a',
    },
    content: {
        padding: 0
    },
    scroll: {
        borderTopWidth: '1px',
    },
    inner: {
        minWidth: 1050,
    },
    firstCol: {
        width: '15px',
        paddingRight: 0,
        paddingLeft: 0,
    },
    column: {
        borderRightWidth: '1px',
        borderRightColor: '#E1E3E5',
        borderRight: 'solid',
        textAlign: 'center',
    },
    selected: {
        border: 'solid',
        borderWidth: '2px',
        borderColor: '#00a1c9',
        backgroundColor: '#e1f5fe'
    },
    linkTitle: {
        fontWeight: 'bold',
        color: '#1565c0',
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    headerContainer: {
        padding: theme.spacing(2),
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#E5E3E1',
        backgroundColor: '#FAFAFA',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: '18px',
    },


    emptyRow: {
        textAlign: 'center',
    },
}));

export default useStyles;