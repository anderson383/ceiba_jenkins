import {axiosIntance} from "../../../../core/config/AxiosConfig";

export const getItemsData = async (endpoint:string) => {
    return await axiosIntance.get(endpoint)

}