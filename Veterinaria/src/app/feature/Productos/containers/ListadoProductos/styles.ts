import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    cardContenedor: {
        background: '#FFFFFF',
        padding: 10,
        borderRadius: 7,
        boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    },
    headerTable: {
        display: 'flex',
    },
    formControl: {
        marginRight: 7,
        minWidth: 300,
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));