import axios from "axios";

export const SubmitKRK = async (data, callback) => {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/analisis/simpankrk/`, 
        data).then(res=>{
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
