
import * as Material from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'app/shared/components/Link';
import {Productos} from '../../../feature/Productos/models/Producto';
import {getItemsData} from './services/DataTableService';

export interface DataTableColumn {
    nombre: string
    code: string
}

export interface DataTableOptionsColumn {
    nombre: string
    action: string
}

interface DataTableProps {
    name: string
    endpoint: string
    opctions?: Array<DataTableOptionsColumn>
    columns: Array<DataTableColumn>
    filters: any,
    actionTable: (action: string, element: Productos) => void
}


const DataTable:React.FC<DataTableProps> = (props) => {
    const {endpoint, columns, filters, actionTable} = props;

    const [currentPage] = React.useState(1);
    const [itemsDataTable, setItemsDataTable] = React.useState<Array<Productos>>([]);

    React.useEffect(() => {
        getListData();
    }, [currentPage, filters]);


    const getListData = () => {
        getItemsData(endpoint, { _page: currentPage, ...filters}).then(response => {
            setItemsDataTable(response.data);
        });
    };

    return (
        <>
            
            <Material.TableContainer>
                <Material.Table>
                    <Material.TableHead>
                        <Material.TableRow>
                            {
                                columns.map(colum => (
                                    <>
                                        <Material.TableCell>
                                            <Material.TableSortLabel>{colum.nombre}</Material.TableSortLabel>
                                        </Material.TableCell>
                                    </>
                                ))  
                            }
                        </Material.TableRow>
                    </Material.TableHead>
                    <Material.TableBody aria-label="list-table"  >
                        {
                            itemsDataTable.map((item, index) => (
                                <Material.TableRow key={index} aria-label="item-list"  >
                                    <Material.TableCell component="th" scope="row" padding="none" className="text--center">
                                        <Material.Avatar  src={item.imagen} />
                                    </Material.TableCell>
                                    <Material.TableCell component="th" scope="row" padding="none">
                                        {item.nombre}
                                    </Material.TableCell>
                                    <Material.TableCell component="th" scope="row" padding="none">
                                        $ {item.precio} EUR
                                    </Material.TableCell>
                                    <Material.TableCell component="th" scope="row" padding="none">
                                        {
                                            item.descuento ? ( <> {item.descuento_porcenaje} % </> ) : ( <> No tiene </> )
                                        }
                                    </Material.TableCell>
                                    <Material.TableCell component="th" scope="row" padding="none">
                                        {
                                            item.descuento_porcenaje ? (  <> $ { item.precio - item.precio * item.descuento_porcenaje / 100 } EUR </> ) : ( <>$ { item.precio } EUR </> )
                                        }
                                    </Material.TableCell>
                                    <Material.TableCell component="th" scope="row" padding="none">
                                        <Link  to={`/productos/${item.id}/`}>
                                            <Material.Button id="editar" color="primary" >
                                                <Material.Icon>edit</Material.Icon>
                                            </Material.Button>
                                        </Link>
                                        <Material.Button id="eliminar" color="secondary" onClick={() => actionTable('eliminar', item)}   aria-controls="simple-menu" aria-haspopup="true" >
                                            <Material.Icon>delete</Material.Icon>
                                        </Material.Button>
                                    </Material.TableCell>
                                    
                                </Material.TableRow>
                            ))
                        }
                    </Material.TableBody>
                </Material.Table>
            </Material.TableContainer>
        </>
    );
};



DataTable.propTypes = {
    name: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    opctions: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    actionTable: PropTypes.func.isRequired,
};
export default DataTable;