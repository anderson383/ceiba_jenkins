import * as PropTypes from 'prop-types';
import * as React from 'react';
import {CardMedia} from '@material-ui/core';

interface ImagenProductoProps {
    imagen_ruta: string,
    texto_alernativo: string
}

export const ImagenProducto:React.FC<ImagenProductoProps> = (props) => {
    const {imagen_ruta, texto_alernativo} = props;
    return (
        <CardMedia
            component="img"
            alt={texto_alernativo}
            width="100%"
            height="500"
            title={texto_alernativo}
            image={ imagen_ruta.length ? imagen_ruta : 'https://thumbs.dreamstime.com/b/icono-del-negro-de-la-satisfacci%C3%B3n-producto-muestra-vector-en-fondo-aislado-s%C3%ADmbolo-concepto-ejemplo-133183611.jpg' }
        />
    );
};

ImagenProducto.propTypes = {
    imagen_ruta: PropTypes.string.isRequired,
    texto_alernativo: PropTypes.string.isRequired
};