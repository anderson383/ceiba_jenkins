import * as DialogEliminar from '../../components/DialogEliminar';
import * as Material from '@material-ui/core';
import * as React from 'react';
import BreadCrump, {RutasBreadCrump} from '../../../../shared/components/BreadCrump';
import DataTable, {DataTableColumn} from '../../../../shared/components/DataTable';
import { Categoria } from '../../models/Categoria';
import { Link } from 'app/shared/components/Link';
import {getCategorias} from '../../services/ProductosService';
import { useStyles } from './styles';
export const ListadoProductos = () => {

    interface FilterProductos {
        'udpate': number,
        'categorias.id'?: number,
        'search': string
    }

    const classes = useStyles();
    const [categorias, setCategorias] = React.useState<Array<Categoria>>([]);

    const [dialogEliminar, setDialogEliminar] = React.useState<DialogEliminar.ConfigDialogProps>({ dialog: false, element: '' });

    const [filterProductos, setFilterProductos] = React.useState<FilterProductos>({
        'udpate': 0,
        'categorias.id': undefined,
        'search': ''
    });

    const handleChange = (e:any) => {
        setFilterProductos((value:FilterProductos) => ({
            ...value,
            'categorias.id': e.target.value
        }));
    };
 
    const routes:Array<RutasBreadCrump> = [
        { nombre: 'Home', path: '/', icon: 'fas fa-home' },
        { nombre: 'Productos', path: '/productos', icon: '' }
    ];
    const columns:Array<DataTableColumn> = [
        { nombre: 'Imagen', code: 'imagen' },
        { nombre: 'Nombre', code: 'nombre' },
        { nombre: 'Precio', code: 'precio' },
        { nombre: 'Descuento', code: 'descuento' },
        { nombre: 'Precio total', code: 'descuento' },
        { nombre: 'Opciones', code: 'descuento' }
    ];

    React.useEffect(() => {
        getCategorias().then(response => {
            setCategorias([ { id: null, nombre: 'No filtro'}, ...response.data ]);
        });
    }, []);

    return (
        <>
            <BreadCrump nombrePage="Productos" rutas={routes} />
            <Material.Card className={classes.cardContenedor}>
                <div className={classes.row}>
                    <Material.FormControl variant="outlined" size="small" className={classes.formControl}>
                        <Material.InputLabel  id="categorias-select" >Categorias</Material.InputLabel>
                        <Material.Select
                            labelId="demo-simple-select-outlined-label"
                            id="categorias-select"
                            label="Categorias"
                            onChange={handleChange}
                            value={filterProductos['categorias.id']}
                        >
                            {
                                categorias.map((item, index) => (
                                    <Material.MenuItem key={index} value={item.id}>{item.nombre}</Material.MenuItem>
                                ))
                            }
                        </Material.Select>
                    </Material.FormControl>
                    <Link to="/productos/añadir">
                        <Material.Button id="nuevo-producto" variant="contained" color="primary" disableElevation >
                            Nuevo producto
                        </Material.Button>
                    </Link>
                </div>
                <DataTable
                    name="Listado de tus productos"
                    endpoint="/productos/"
                    columns={columns}
                    filters={filterProductos}
                    actionTable={((action, element) => {
                        if (action === 'eliminar') setDialogEliminar({ dialog: true, element: String(element.id) });
                    })}
                />
            </Material.Card>
            <DialogEliminar.DialogEliminar valueDialog={dialogEliminar} setValueDialog={setDialogEliminar} reloadData={() => setFilterProductos(pre => ({...pre, udpate: pre.udpate + 1 }))} />
        </>
    );
};