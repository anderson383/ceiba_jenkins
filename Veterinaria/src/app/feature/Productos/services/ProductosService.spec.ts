import * as AxiosInstance  from '../../../core/config/AxiosConfig';
import * as ProductoService  from './ProductosService';


import {ProductoResolve} from './ResolveMocks';

jest.mock('../../../core/config/AxiosConfig');

describe('Servicio de productos',() => {

    afterEach(jest.clearAllMocks);

    it ('Debe obtener la data de 1 solo producto', async () => {
        // Arrange
        AxiosInstance.axiosIntance.get.mockImplementation(() => Promise.resolve({data: ProductoResolve}));
        // Act
        const response = await ProductoService.getDetalleProducto('1');
        // Assert
        expect(response.data.nombre).toBe('Perros Collar Pro Rosado Con Gris Small 3/4');
    });

    it ('Debe crear 1 producto', async () => {
        // Arrange
        AxiosInstance.axiosIntance.post.mockImplementationOnce(() => Promise.resolve({data: ProductoResolve}));
        // Act
        const response = await ProductoService.createDetalleProducto(ProductoResolve);
        // Assert
        expect(response.data.nombre).toBe('Perros Collar Pro Rosado Con Gris Small 3/4');
    });

    it ('Debe editar 1 producto con id = 1', async () => {
        // Arrange
        AxiosInstance.axiosIntance.put.mockImplementationOnce(() => Promise.resolve({data: ProductoResolve}));
        // Act
        const response = await ProductoService.updateDetalleProducto(String(ProductoResolve.id), ProductoResolve);
        // Assert
        expect(response.data.nombre).toBe('Perros Collar Pro Rosado Con Gris Small 3/4');
    });

    it ('Debe eliminar 1 producto con id = 1', async () => {
        // Arrange
        AxiosInstance.axiosIntance.delete.mockImplementationOnce(() => Promise.resolve({data: ''}));
        const response = await ProductoService.deleteDetalleProducto(String(ProductoResolve.id));
        // Assert
        expect(response.data).toBe('');
    });
});