import * as React from 'react';
import * as TestingLibrary from '@testing-library/react';
import {ImagenProducto} from './index';


describe('Servicio de productos',() => {
    let component: TestingLibrary.RenderResult;
    beforeEach(() => {
        component = TestingLibrary.render(<ImagenProducto imagen_ruta="http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg" texto_alernativo="imagen de perro prueba"  />);
    });

    it ('Debe de tener en su imagen de contenido la ruta especificada', async () => {
        const imagen = component.container.querySelector('img');
        expect(imagen.src).toBe('http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg');
        expect(imagen.getAttribute('alt')).toBe('imagen de perro prueba');
        expect(imagen.getAttribute('title')).toBe('imagen de perro prueba');
    });
});