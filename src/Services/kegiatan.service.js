import axios from "axios";

export const Kegiatan = async (jenis, callback) => {
    let url = `${import.meta.env.VITE_BASE_URL}/analisis/get_list_kegiatan/${jenis}`;
    return axios.get(url).then(res=>{        
        let cvrt = [];
        for (let index = 0; index < res.data.data.length; index++) {
            cvrt.push({
                id: res.data.data[index].key,
                text: res.data.data[index].value
            })
        }        
        callback({
            'status':res.status,
            'data':cvrt
        })
    }).catch(err=>{
        callback({
            'status':err.status,
            'message':err.message
        })
    })
}