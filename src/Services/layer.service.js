import axios from "axios";

export const LayerInfo = async (layer, kode, callback) => {
    let url = `${import.meta.env.VITE_BASE_URL}/analisis/get_detail_info?layer=${layer}&kode=${kode}`;
    return axios.get(url).then(res=>{        
        callback({
            'status':res.status,
            'data':res.data
        })
    }).catch(err=>{
        console.log(err);
        callback({
            'status':err.status,
            'message':err.message
        })
    })
}