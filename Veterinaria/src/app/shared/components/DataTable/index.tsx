import * as React from 'react'
import DataTablePagination from "./DataTablePagination";
import {useEffect, useState} from "react";
import {getItemsData} from "./services/DataTableService";

interface DataTableProps {
    name: string
    endpoint: string
}

const DataTable:React.FC<DataTableProps> = ({name, endpoint}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsDataTable, setItemsDataTable] = useState([])
    useEffect(() => {
        getItemsData(endpoint + '?_page=' + currentPage)
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
                                    <th scope="col" className="sort" data-sort="name">Project</th>
                                    <th scope="col" className="sort" data-sort="budget">Budget</th>
                                    <th scope="col" className="sort" data-sort="status">Status</th>
                                    <th scope="col">Users</th>
                                    <th scope="col" className="sort" data-sort="completion">Completion</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody className="list">
                                    <tr>
                                        <th scope="row">
                                            <div className="media align-items-center">
                                                <a href="#" className="avatar rounded-circle mr-3">
                                                    <img alt="Image placeholder" src="../assets/img/theme/bootstrap.jpg" />
                                                </a>
                                                <div className="media-body">
                                                    <span className="name mb-0 text-sm">Argon Design System</span>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="budget">
                                            $2500 USD
                                        </td>
                                        <td>
                                          <span className="badge badge-dot mr-4">
                                            <i className="bg-warning"></i>
                                            <span className="status">pending</span>
                                          </span>
                                        </td>
                                        <td>
                                            <div className="avatar-group">
                                                <a href="#" className="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                                                   data-original-title="Ryan Tompson">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-1.jpg"/>
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="completion mr-2">60%</span>
                                                <div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <div className="dropdown">
                                                <a className="btn btn-sm btn-icon-only text-light" href="#" role="button"
                                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer py-3">
                            <DataTablePagination length={6} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable