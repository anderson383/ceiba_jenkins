import *  as Material from '@material-ui/core';
import * as ProductoService from '../../services/ProductosService';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactHook from 'react-hook-form';
import * as yup from 'yup';
import {Categoria} from '../../models/Categoria';
import {INITIAL_STATE_PRODUCTO} from '../../models/StateInitial';
import {ImagenProducto} from '../ImagenProducto';
import { Productos } from '../../models/Producto';
import moment from 'moment';
import {useHistory} from 'react-router-dom';
import { useStyles } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';


interface FormGestionProductoProps {
    producto?: Productos,
    onSubmitPreview: (producto: Productos) => void
    changeTab: (value:number) => void
}

export const FormGestionProductos:React.FC<FormGestionProductoProps> = (
    {
        onSubmitPreview,
        changeTab,
        producto = INITIAL_STATE_PRODUCTO
    }
) => {
    // Make styles class
    const classes = useStyles();
    const history = useHistory();

    const schema = yup.object().shape({
        nombre: yup.string().required('El nombre es requerido'),
        imagen: yup.string().url('Debe ser una URL valida').required('La url de imagen es requerido'),
        precio: yup.number().positive('Debe ser un número positivo').required('El precio es requerido').typeError('Debes especificar un número'),
        descuento_porcenaje: yup.number().max(100, 'El porcentaje no debe superar el 100%').notRequired().nullable(true).transform((v:number) => isNaN(v) ? null : v),
        fecha_inicio_descuento: yup.date().when('descuento_porcenaje',  (descuento_porcenaje: any, schema: { required: (arg0: string) => any; }) => (
            descuento_porcenaje > 0 ? schema.required('Fecha de inicio de descuento es requerido') : schema
        )),
        fecha_final_descuento: yup.date().when('descuento_porcenaje',  (descuento_porcenaje: any, schema: { required: (arg0: string) => any; }) => (
            descuento_porcenaje > 0 ? schema.required('Fecha final de descuento es requerido') : schema
        )),
        envio_gratis: yup.boolean(),
        valor_envio: yup.number().typeError('Debes especificar un número').when('envio_gratis',  (envio_gratis: boolean, schema: { required: (arg0: string) => any, notRequired: () => any  }) => (
            envio_gratis ? schema.notRequired().nullable(true).transform((v:number) => isNaN(v) ? null : v) : schema.required('El valor del envio es requerido').positive('Debe ser un número positivo')
        )),
        descripcion: yup.string().notRequired(),
        categoria:  yup.string().required('La categoria es requerida'),
    });
    const { register, handleSubmit, reset, control, formState: {errors} } = ReactHook.useForm<Productos>(
        {
            resolver: yupResolver(schema), defaultValues: React.useMemo(() => {
                return producto;
            }, [producto])
        }
    );


    const [categorias, setCategorias] = React.useState<Array<Categoria>>([]);



    React.useEffect(() => {
        reset({
            ...producto,
            fecha_inicio_descuento: convertDateOfNull(producto.fecha_inicio_descuento),
            fecha_final_descuento: convertDateOfNull(producto.fecha_final_descuento)
        });
    }, [producto, reset]);

    React.useEffect(() => {
        ProductoService.getCategorias().then(response => {
            setCategorias(response.data);
        });
    }, []);



    const onSubmit = (dataForm:Productos) => {
        const newProducto:Productos = {
            ...dataForm,
            descuento: dataForm.descuento_porcenaje  ? true : false,
            categorias: categorias.find(item => (item.id === dataForm.categoria)) || { id: 0, nombre: '' }
        };
        if (producto.id) {
            ProductoService.updateDetalleProducto(String(newProducto.id), newProducto).then(response => {
                history.push('/productos');
            });
        } else {
            ProductoService.createDetalleProducto(newProducto).then(response => {
                history.push('/productos');
            });
        }
    };

    const onSubmitPrevCambios = (dataForm:Productos) => {
        onSubmitPreview({
            ...dataForm,
            descuento: dataForm.descuento_porcenaje  ? true : false,
            categorias: categorias.find(item => (item.id === dataForm.categoria)) || { id: 0, nombre: '' }
        });
        changeTab(1);
    };

    const convertDateOfNull = (date:Date | null) => {
        return date ? moment(date).format('YYYY-MM-DD[T]HH:mm:ss') : moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss');
    };

    return (
        <>
        <Material.Grid>
            <Material.Grid container item xs={12} spacing={3}   className={classes.containerForm}>
                <Material.Grid item xs={12} md={5}>
                    <ImagenProducto imagen_ruta={producto.imagen} texto_alernativo={'Imagen de muestra'} />
                </Material.Grid>
                <Material.Grid item xs={12} md={7} className={classes.containerForm} >
                    <form onSubmit={handleSubmit(onSubmit)} id="form" >
                        <Material.Grid container item xs={12} spacing={3}>
                            <Material.Grid item xs={12} md={6}>
                                <ReactHook.Controller
                                    name="nombre"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <Material.FormControl size="small"  fullWidth variant="outlined">
                                            <Material.InputLabel htmlFor="nombre-producto">Nombre de producto</Material.InputLabel>
                                            <Material.OutlinedInput
                                                id="nombre-producto"
                                                error={'nombre' in errors}
                                                aria-describedby="component-error-text"
                                                labelWidth={150}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value || ''}
                                                onChange={onChange}
                                            />
                                        </Material.FormControl>
                                    )}
                                />
                                <Material.FormHelperText component="span" >{errors.nombre?.message}</Material.FormHelperText>
                            </Material.Grid>
                            <Material.Grid item xs={12} md={6}>
                                <ReactHook.Controller
                                    name="imagen"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <Material.FormControl size="small"   fullWidth variant="outlined">
                                            <Material.InputLabel htmlFor="url-imagen">Url de imagen</Material.InputLabel>
                                            <Material.OutlinedInput
                                                id="url-imagen"
                                                error={'imagen' in errors}
                                                aria-describedby="component-error-text"
                                                labelWidth={100}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value || ''}
                                                onChange={onChange}
                                            />
                                            <Material.FormHelperText component="span" >{errors.imagen?.message}</Material.FormHelperText>
                                        </Material.FormControl>
                                    )}
                                />

                            </Material.Grid>
                            <Material.Grid item xs={12} md={6}>
                                <ReactHook.Controller
                                    name="precio"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <Material.FormControl size="small"   fullWidth variant="outlined">
                                            <Material.InputLabel htmlFor="precio">Precio</Material.InputLabel>
                                            <Material.OutlinedInput
                                                error={'precio' in errors}
                                                id="precio"
                                                type="number"
                                                aria-describedby="component-error-text"
                                                labelWidth={60}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value}
                                                onChange={onChange}
                                            />
                                            <Material.FormHelperText component="span" >{errors.precio?.message}</Material.FormHelperText>
                                        </Material.FormControl>
                                    )}
                                />

                            </Material.Grid>
                            <Material.Grid item xs={12} md={6}>
                                <ReactHook.Controller
                                    name="categoria"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <Material.FormControl variant="outlined" size="small" className={classes.formCategoria}>
                                            <Material.InputLabel  id="select-categoria" >Categoria</Material.InputLabel>
                                            <Material.Select
                                                labelId="categoria"
                                                error={'categoria' in errors}
                                                id="select-categoria"
                                                label="Categorias"
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value || ''}
                                                data-testid={'select-categoriad'}
                                                onChange={onChange}
                                                SelectDisplayProps={{
                                                    // @ts-ignore
                                                    'data-testid': 'select-categoriad'
                                                }}
                                            >
                                                {
                                                    categorias.map((item, index) => (<Material.MenuItem key={index} value={item.id}>{item.nombre}</Material.MenuItem>))
                                                }
                                            </Material.Select>
                                            <Material.FormHelperText component="span" >{errors.categoria?.message}</Material.FormHelperText>
                                        </Material.FormControl>
                                    )}
                                />

                            </Material.Grid>
                            <Material.Grid item xs={12}>
                                <ReactHook.Controller
                                    name="descuento_porcenaje"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <Material.FormControl size="small"   fullWidth variant="outlined">
                                            <Material.InputLabel htmlFor="descuento">Descuento %</Material.InputLabel>
                                            <Material.OutlinedInput
                                                id="descuento"
                                                type="number"
                                                error={'descuento_porcenaje' in errors}
                                                aria-describedby="component-error-text"
                                                labelWidth={100}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value}
                                                onChange={onChange}
                                            />
                                            <Material.FormHelperText component="span" >{errors.descuento_porcenaje?.message}</Material.FormHelperText>
                                        </Material.FormControl>
                                    )}
                                />
                            </Material.Grid>
                            <Material.Grid item  xs={12} >
                                <ReactHook.Controller
                                    name="fecha_inicio_descuento"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <>
                                            <Material.TextField
                                                id="fecha-inicio"
                                                size="small"
                                                label="Fecha de inicio de descuento"
                                                type="datetime-local"
                                                variant="outlined"
                                                className={classes.formCategoria}
                                                error={'fecha_inicio_descuento' in errors}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value || ''}
                                                onChange={onChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <Material.FormHelperText component="span" >{errors.fecha_inicio_descuento?.message}</Material.FormHelperText>
                                        </>
                                    )}
                                />
                            </Material.Grid>
                            <Material.Grid item  xs={12} >
                                <ReactHook.Controller
                                    name="fecha_final_descuento"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <>
                                            <Material.TextField
                                                id="fecha-final"
                                                size="small"
                                                label="Fecha de final de descuento"
                                                type="datetime-local"
                                                className={classes.formCategoria}
                                                variant="outlined"
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value || ''}
                                                onChange={onChange}
                                                error={'fecha_final_descuento' in errors}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <Material.FormHelperText component="span" >{errors.fecha_final_descuento?.message}</Material.FormHelperText>
                                        </>
                                    )}
                                />
                            </Material.Grid>
                            <Material.Grid item xs={12} >
                                <Material.TextareaAutosize
                                    id="descripcion"
                                    maxRows="8"
                                    minRows="8"
                                    {...register('descripcion', { required: false })}
                                    className={classes.textArea}
                                    aria-label="maximum height"
                                    placeholder="Descripción del producto"
                                    />
                            </Material.Grid>
                            <Material.Grid item xs={4}>
                                <ReactHook.Controller
                                    name="envio_gratis"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                            <Material.FormControlLabel
                                                value="end"
                                                control={<Material.Switch
                                                    onBlur={onBlur}
                                                    id="envio-gratis"
                                                    inputRef={ref}
                                                    checked={value || false}
                                                    onChange={onChange}
                                                />}
                                                label="Envio gratis"
                                                labelPlacement="end"
                                            />
                                        )}
                                />
                            </Material.Grid>
                            <Material.Grid item xs={4}>
                                <ReactHook.Controller
                                    name="valor_envio"
                                    control={control}
                                    render={({ field: { onChange, value, ref, onBlur } }) => (
                                        <Material.FormControl size="small"   fullWidth variant="outlined">
                                            <Material.InputLabel htmlFor="valor-envio">Valor de envio</Material.InputLabel>
                                            <Material.OutlinedInput
                                                type="number"
                                                error={'valor_envio' in errors}
                                                id="valor-envio"
                                                aria-describedby="component-error-text"
                                                labelWidth={110}
                                                onBlur={onBlur}
                                                inputRef={ref}
                                                value={value}
                                                onChange={onChange}
                                            />
                                            <Material.FormHelperText component="span" >{errors.valor_envio?.message}</Material.FormHelperText>
                                        </Material.FormControl>
                                    )}
                                />
                            </Material.Grid>
                            <Material.Grid item xs={12}>
                                <Material.Divider light />
                            </Material.Grid>
                            <Material.Grid item xs={12}>
                                <Material.Box className={classes.contentActions}>
                                    <Material.Button id="ver-cambios" type="button" form={'form'} onClick={handleSubmit(onSubmitPrevCambios)} variant="contained"  color="default" disableElevation >
                                        Guardar y ver cambios
                                        <Material.Icon  fontSize="small" className={classes.icon}>preview</Material.Icon>
                                    </Material.Button>
                                    <Material.Button  id="ver-guardar" type="submit" variant="contained"  color="primary" disableElevation >
                                        Guardar producto
                                        <Material.Icon fontSize="small" className={classes.icon} >save</Material.Icon>
                                    </Material.Button>
                                </Material.Box>
                            </Material.Grid>
                        </Material.Grid>
                    </form>
                </Material.Grid>
            </Material.Grid>
        </Material.Grid>
        </>

    );
};


FormGestionProductos.propTypes = {
    producto: PropTypes.any.isRequired,
    onSubmitPreview: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired
};