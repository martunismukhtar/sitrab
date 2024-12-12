import axios from "axios";

export const statusPengajuan = async (data, callback) => {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/analisis/update_status`, data).then(res=>{
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
    
};
