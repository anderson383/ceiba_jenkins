export interface Productos {
    nombre: string,
    descripcion: string
    imagen: string
    precio: number,
    descuento: boolean
    descuento_porcenaje: number | null
    valor_descuento: number | null
    envio_gratis: boolean
    valor_envio: number | null
    fecha_inicio_descuento: Date | null
    fecha_final_descuento: Date | null
}