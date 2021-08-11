import * as React from 'react'
import {FunctionComponent, useState} from "react";

interface DataTablePagination {
    length: number,
    currentPage: number
    setCurrentPage: Function
}

const DataTablePagination: React.FC<DataTablePagination> = ({length, currentPage, setCurrentPage}) => {
    return (
        <>
            <nav aria-label="...">
                <ul className="pagination justify-content-end mb-0">
                    <li
                        onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
                        className={`page-item  ${currentPage !== 1 ? '' : 'disabled'}`}
                    >
                        <span className="page-link" >
                            <i className="fas fa-angle-left"></i>
                            <span className="sr-only">Previous</span>
                        </span>
                    </li>
                    {
                        Array.from(Array(length), (elent, index) => (
                            <li key={index} className={`page-item ${ currentPage === index + 1 ? 'active': ''} `} >
                                <span onClick={() => setCurrentPage(index + 1)} className="page-link" >{index + 1}</span>
                            </li>
                        ))
                    }
                    <li
                        className={`page-item  ${currentPage !== length ? '' : 'disabled'}`}
                        onClick={() => currentPage !== length && setCurrentPage(currentPage + 1)}
                    >
                        <span className="page-link"   >
                            <i className="fas fa-angle-right"></i>
                            <span className="sr-only">Next</span>
                        </span>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default DataTablePagination