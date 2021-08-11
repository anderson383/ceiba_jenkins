import * as React from 'react';
import DataTablePagination from "./index";
import {fireEvent, wait, prettyDOM, render, RenderResult} from "@testing-library/react";


describe('Paginador de la tabla testing', () => {

    it('you must disable the back button if the current value is one ',  () => {
        let component:RenderResult = render(
            <DataTablePagination
                length={10}
                currentPage={1}
                setCurrentPage={() => {}}
            />
        )
        let listaItems = component.container.querySelectorAll('li')
        expect(listaItems[0]).toHaveClass('disabled')
        expect(listaItems.length).toBe(12)
    });

    it('14 li should appear if its length parameter is equal to 12',  () => {
        let component:RenderResult = render(
            <DataTablePagination
                length={12}
                currentPage={1}
                setCurrentPage={() => {}}
            />
        )
        let listaItems = component.container.querySelectorAll('li')
        expect(listaItems.length).toBe(14)
    });

})