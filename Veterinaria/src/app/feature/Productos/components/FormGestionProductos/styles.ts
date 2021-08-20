import {
    makeStyles
} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 10,
    },
    formCategoria: {
        minWidth: '100%'
    },
    textArea: {
        width: '100%'
    },
    containerForm: {
        margin: '0!important',
        padding: '0!important'
    },
    contentActions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    icon: {
        marginLeft: 10
    }
}));