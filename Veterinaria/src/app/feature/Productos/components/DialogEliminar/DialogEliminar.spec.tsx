import * as DialogEliminarConf  from './index';
import * as React from 'react';
import * as TestingLibrary from '@testing-library/react';



describe('Componente modal para eliminar un producto', () => {

    const setup = (valoresIniciales: DialogEliminarConf.ConfigDialogProps) => {
        const mockSetValueDialog = jest.fn();
        const mockChange = jest.fn();
        const component = TestingLibrary.render(
            <DialogEliminarConf.DialogEliminar valueDialog={valoresIniciales} setValueDialog={mockSetValueDialog} reloadData={mockChange} />
        );
        return {
            component,
            mockSetValueDialog,
            mockChange
        };
    };

    it('Debe mostrar una advertencia antes de eliminar', async () => {
        await TestingLibrary.wait(() => {
            const { component: {baseElement} } = setup({dialog: true, element: '23'});
            expect(baseElement).toHaveTextContent('¿Seguro que desea eliminar el producto?');
        });

    });
});