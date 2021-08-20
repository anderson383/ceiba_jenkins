import {axiosIntance} from '../../../../core/config/AxiosConfig';

export const getItemsData = async (endpoint:string, filtros:any) => {
    let complementos:string = '';
    complementos += (complementos.indexOf('?') >= 0) ? '&' : '?';
    for (const clave in filtros) {
        if (filtros[clave]) {
            complementos += `${clave}=${encodeURIComponent(filtros[clave])}&`;
        }
    } 
    return await axiosIntance.get(endpoint + complementos);

};