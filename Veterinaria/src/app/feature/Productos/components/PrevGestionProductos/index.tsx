import * as Material from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {INITIAL_STATE_PRODUCTO} from '../../models/StateInitial';
import {ImagenProducto} from '../ImagenProducto';
import {Productos} from '../../models/Producto';
import {useStyles} from './styles';

interface PrevGestionProductosProps  {
    producto?: Productos,
    changeTab: (value:number) => void
}

export const PrevGestionProductos:React.FC<PrevGestionProductosProps> = ({producto = INITIAL_STATE_PRODUCTO, changeTab}) => {

    const classes = useStyles();

    return (
        <>
           <Material.Grid>
                <Material.Grid container  item xs={12} spacing={3} >
                    <Material.Grid item xs={5}>
                        <ImagenProducto imagen_ruta={producto.imagen} texto_alernativo={'Imagen de muestra'} />
                    </Material.Grid>
                    <Material.Grid item xs={7}>
                        <Material.Typography gutterBottom variant="h6" component="h2">
                            {producto.nombre}
                        </Material.Typography>
                        <Material.Typography variant="body2" color="textSecondary" component="p">
                            {producto.categorias.nombre}
                        </Material.Typography>
                        <Material.Typography className={classes.textPrecioAnterior} variant="subtitle2" color="textSecondary" gutterBottom>
                            {
                                producto.descuento && '$ ' + producto.precio
                            }
                        </Material.Typography>
                        <Material.Box display="flex" className="content-precio">
                            <Material.Typography gutterBottom variant="h5" component="h3">
                                $ {  producto.descuento ? producto.precio - producto.precio * producto.descuento_porcenaje / 100 : producto.precio}
                            </Material.Typography>
                            <Material.Typography gutterBottom variant="caption"   className={classes.textDescuentoPorcentaje} component="span">{producto.descuento && producto.descuento_porcenaje + '% OFF'}</Material.Typography>
                        </Material.Box>
                        <Material.Typography variant="body2" color="textSecondary" component="p">
                            {producto.descripcion}
                        </Material.Typography>

                        <Material.Box display="flex" mt="10"  className={classes.textEnvio}>
                            <Material.Icon>local_shipping</Material.Icon>
                            <Material.Typography className={classes.textDescuentoPorcentaje} variant="body2" color="textSecondary" component="p">
                                {producto.envio_gratis ? 'Envio gratis' : 'Valor del envio $' + producto.valor_envio}
                            </Material.Typography>
                        </Material.Box>
                            <Material.Divider  className={classes.spacer} light />
                        <Material.Box>
                            <Material.Button id="seguir-configurando" onClick={() => changeTab(0)} type="submit" variant="contained" color="primary" disableElevation >
                                Seguir configurando
                            </Material.Button>
                        </Material.Box>
                    </Material.Grid>
                </Material.Grid>
           </Material.Grid>
        </>
    );
};
PrevGestionProductos.propTypes = {
    producto: PropTypes.any.isRequired,
    changeTab: PropTypes.func.isRequired
};