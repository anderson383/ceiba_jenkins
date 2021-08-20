import * as React from 'react';
import * as TestingLibrary from '@testing-library/react';
import { PrevGestionProductos } from './index';
import {Productos} from '../../models/Producto';

describe('Previsualizacion de campos configurados de 1 producto', () => {
    const PRODUCTO: Productos = {
        categoria: 2,
        descripcion: 'Tiene un lindo diseño que es ideal para que tu mascota tenga su espacio privado dentro de tu hogar',
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

    it('Debe mostrar el nombre, categoria en el componente', () => {
        const component = TestingLibrary.render(<PrevGestionProductos changeTab={() => {}} producto={PRODUCTO} />);
        expect(component.container).toHaveTextContent(PRODUCTO.nombre);
        expect(component.container).toHaveTextContent(PRODUCTO.categorias.nombre);
    });

    it('Debe mostrar el precio  con descuento del 15%', () => {
        const component = TestingLibrary.render(<PrevGestionProductos changeTab={() => {}} producto={PRODUCTO} />);
        expect(component.container).toHaveTextContent('51');
    });

    it('Debe mostrar envio gratis', () => {
        const component = TestingLibrary.render(<PrevGestionProductos changeTab={() => {}} producto={PRODUCTO} />);
        expect(component.container).toHaveTextContent('Envio gratis');
    });

    it('Debe mostrar da descripcion del valor del envio y el valor del envio', () => {
        const component = TestingLibrary.render(<PrevGestionProductos changeTab={() => {}} producto={{...PRODUCTO, envio_gratis: false, valor_envio: 9000}} />);
        expect(component.container).toHaveTextContent('Valor del envio');
        expect(component.container).toHaveTextContent('9000');
    });

    it('Se hizo click en el boton de Seguir configurando cambio de tab', () => {
        const mockHandler = jest.fn();
        const component = TestingLibrary.render(<PrevGestionProductos changeTab={mockHandler} producto={{...PRODUCTO, envio_gratis: false, valor_envio: 9000}} />);

        const button = component.getByText('Seguir configurando');

        TestingLibrary.fireEvent.click(button);
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });
});

