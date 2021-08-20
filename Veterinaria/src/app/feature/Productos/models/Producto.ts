import {Categoria} from './Categoria';

export interface Productos {
    id: number | string
    nombre: string
    descripcion: string
    imagen: string
    precio: number
    descuento: boolean
    descuento_porcenaje: number
    envio_gratis: boolean
    valor_envio: number
    fecha_inicio_descuento: Date | null
    fecha_final_descuento: Date | null
    categorias: Categoria
    categoria: number | string
}