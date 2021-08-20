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
    textPrecioAnterior: {
        textDecorationLine: 'line-through'
    },
    textDescuentoPorcentaje: {
        color: '#28c76f',
        display: 'inline-block',
        marginLeft: 10
    },
    textEnvio: {
        marginTop: 22,
        color: '#28c76f',
    },
    spacer: {
        marginTop: 130,
        marginBottom: 20
    }
}));