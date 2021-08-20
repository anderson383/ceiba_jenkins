import * as Material  from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {deleteDetalleProducto} from '../../services/ProductosService';

export interface ConfigDialogProps {
    dialog: boolean,
    element: string
}

interface DialogEliminarProps  {
    valueDialog?: ConfigDialogProps,
    setValueDialog: (config:ConfigDialogProps) => void
    reloadData: () => void
}

export const DialogEliminar:React.FC<DialogEliminarProps> = ({
    valueDialog = {
         dialog: false,
         element: ''
    },
    reloadData,
    setValueDialog
}) => {
    const [loading, setLoading] = React.useState<boolean>();

    const eliminarProducto = () => {
        setLoading(true);
        deleteDetalleProducto(valueDialog.element).then(response => {
            setValueDialog({ dialog: false, element: '' });
            setLoading(false);
            reloadData();
        });
    };
    return (
        <>
            <Material.Dialog
                open={valueDialog.dialog}
                onClose={() => setValueDialog({ dialog: false, element: '' })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Material.DialogTitle id="alert-dialog-title">¿Seguro que desea eliminar el producto?</Material.DialogTitle>
                <Material.DialogActions>
                    <Material.Button onClick={() => setValueDialog({ dialog: false, element: '' })} color="primary" autoFocus>
                        Cancelar
                    </Material.Button>
                    <Material.Button id="eliminar-element" onClick={() => eliminarProducto()} color="primary" autoFocus>
                        {
                            !loading ? 'Aceptar' : <Material.CircularProgress size={15} />
                        }
                    </Material.Button>
                </Material.DialogActions>
            </Material.Dialog>
        </>
    );
};

DialogEliminar.propTypes = {
    setValueDialog: PropTypes.func.isRequired,
    reloadData: PropTypes.func.isRequired,
    valueDialog:  PropTypes.shape({
        dialog: PropTypes.bool.isRequired,
        element: PropTypes.string.isRequired,
    })
};