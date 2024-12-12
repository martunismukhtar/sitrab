import axios from "axios";

export const Layers = async (callback) => {    
    let url = `${import.meta.env.VITE_BASE_URL}/analisis/get_layers`;
    return axios.get(url).then(res=>{
        callback({
            'status':res.status,
            'data':res.data
        })
    }).catch(err=>{
        callback({
            'status':err.status,
            'message':err.message
        })        
    })
}