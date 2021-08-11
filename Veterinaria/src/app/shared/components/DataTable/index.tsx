import * as React from 'react'
import DataTablePagination from "./DataTablePagination";
import {useEffect, useState} from "react";
import {getItemsData} from "./services/DataTableService";
import {Productos} from "../../../feature/Productos/models/Producto";

export interface DataTableColumn {
    nombre: string
    code: string
}

interface DataTableProps {
    name: string
    endpoint: string
    columns: Array<DataTableColumn>
}



const DataTable:React.FC<DataTableProps> = ({name, endpoint, columns}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsDataTable, setItemsDataTable] = useState<Array<Productos>>([])

    const buildColumms = () => {

    }

    useEffect(() => {
        getItemsData(endpoint + '?_page=' + currentPage).then(response => {
            console.log(response)
            setItemsDataTable(response.data)
        })
    }, [currentPage])
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="card bg-default shadow">
                        <div className="card-header bg-transparent border-0">
                            <h3 className="text-white mb-0">{name}</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-items-center table-dark table-flush">
                                <thead className="thead-dark">
                                <tr>
                                    {
                                        columns.map(colum => (
                                            <>
                                                <th scope="col" className="sort" data-sort={colum.code}>{colum.nombre}</th>
                                            </>
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody className="list">
                                {
                                    itemsDataTable.map(elem => (
                                        <>
                                            <tr>
                                                <td scope="row">
                                                    <div className="media align-items-center text-center">
                                                        <a href="#" className="avatar rounded-circle mr-3">
                                                            <img alt="Image placeholder" src={elem.imagen} />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="budget">
                                                    <div className="media-body">
                                                        <span className="name mb-0 text-sm">{elem.nombre}</span>
                                                    </div>
                                                </td>
                                                <td className="budget">$ {elem.precio} EUR</td>
                                                <td>
                                                  <span className="badge badge-dot mr-4">
                                                      {
                                                          elem.descuento ? (
                                                              <>
                                                                  <i className="bg-success"></i>
                                                                  <span className="status">{elem.descuento_porcenaje} %</span>
                                                              </>
                                                          ) : (
                                                              <>
                                                                  <i className="bg-warning"></i>
                                                                  <span className="status">No tiene</span>
                                                              </>
                                                          )
                                                      }
                                                  </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {
                                                            elem.descuento_porcenaje ? (
                                                                <>
                                                                    <span className="completion mr-2">$ { elem.precio - elem.precio * elem.descuento_porcenaje / 100 } EUR</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="completion mr-2">$ { elem.precio } EUR</span>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button"
                                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                            <a className="dropdown-item" href="#">Editar</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer py-3">
                            <DataTablePagination length={2} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable