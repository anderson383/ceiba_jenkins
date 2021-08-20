import { combineReducers } from 'redux';
import productos from './productos/productosReductor';
import productosVet from './productos_vet/productosReductor';

export default combineReducers({ productos, productosVet });
