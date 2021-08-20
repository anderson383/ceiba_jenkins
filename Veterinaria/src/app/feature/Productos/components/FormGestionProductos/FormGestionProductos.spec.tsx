import * as React from 'react';
import * as TestingLibrary from '@testing-library/react';
import {FormGestionProductos} from './index';
import {INITIAL_STATE_PRODUCTO} from '../../models/StateInitial';
import {Productos} from '../../models/Producto';

interface setupParams {
    producto: Productos
}

describe('Formulario de gestion de productos', () => {

    const setup = ({ producto }: setupParams) => {
        const mockOnSubmitPreview = jest.fn();
        const mockChange = jest.fn();
        const component = TestingLibrary.render(
            <FormGestionProductos
                changeTab={mockChange}
                producto={producto}
                onSubmitPreview={mockOnSubmitPreview}
            />
        );
        return {
            component,
            mockOnSubmitPreview,
            mockChange
        };
    };

    it('Debe mostrar campos obligatorios al presionar submit ', async () => {
        const { component } = setup({producto:INITIAL_STATE_PRODUCTO});
        const submitButton = component.getByText('Guardar y ver cambios');
        TestingLibrary.wait(() => {
            TestingLibrary.fireEvent.click(submitButton);
            expect(component.container).toHaveTextContent('El nombre es requerido');
            expect(component.container).toHaveTextContent('La url de imagen es requerido');
            expect(component.container).toHaveTextContent('Debe ser un número positivo');
            expect(component.container).toHaveTextContent('La categoria es requerida');
        });
    });
    it('Debe mostrar llenos con inputs con la información precargada', async () => {
        const prepareData = {
            categoria: 2,
            descripcion: 'Tiene un lindo diseño que es ideal para que tu mascota tenga su espacio privado dentro de tu hogar, con un toque atractivo, esta camita puedes colocarla en un espacio fresco para él,  cerca  de  ti, aunque tu mascota es sociable, en momentos necesita de su propio espacio, donde mejore su irritabilidad, le de paz, y mejore la circulación de la energía en su cuerpo.',
            envio_gratis: true,
            valor_envio: 0,
            descuento_porcenaje: 15,
            fecha_final_descuento: new Date(),
            fecha_inicio_descuento: new Date(),
            precio: 60,
            imagen: 'https://www.ciudaddemascotas.com/pub/media/catalog/product/cache/69c62af52119a2e09af1a901268e75f5/t/a/tama_o_13_1.jpg',
            nombre: 'Perros Collar Pro Rosado Con Gris Small 3/4',
            id: 2,
            descuento: true,
            categorias: {
                id: 2,
                nombre: 'Collares'
            }
        };
        const { component } = setup({producto:prepareData});
        const inputNombre = component.getByLabelText('Nombre de producto');
        const inputImage = component.getByLabelText('Url de imagen');
        const inputDescuento = component.getByLabelText('Descuento %');
        expect(prepareData.nombre).toBe(inputNombre.getAttribute('value'));
        expect(prepareData.imagen).toBe(inputImage.getAttribute('value'));
        expect(prepareData.descuento_porcenaje).toEqual(Number(inputDescuento.getAttribute('value')));
    });
});