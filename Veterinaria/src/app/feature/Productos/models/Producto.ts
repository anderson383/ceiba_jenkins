export interface Productos {
    nombre: string,
    descripcion: string
    imagen: string
    precio: number,
    descuento: boolean
    valor_descuento: number | null
    envio_gratis: boolean
    valor_envio: number | null
    fecha_inicio_descuento: Date
    fecha_final_descuento: Date
}