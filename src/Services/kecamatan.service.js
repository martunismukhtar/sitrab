import axios from "axios";

export const Kecamatan = async (callback) => {
    let url = `${import.meta.env.VITE_BASE_URL}/analisis/kecamatan/`;
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