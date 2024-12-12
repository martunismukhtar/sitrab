import axios from "axios";

export const JenisKegiatan = async (callback) => {
    let url = `${import.meta.env.VITE_BASE_URL}/analisis/get_list_jenis/`;
    return axios.get(url).then(res=>{ 
        let options = [];       
        for (let index = 0; index < res.data.data.length; index++) {
            options.push({
                id: res.data.data[index].key,
                text: res.data.data[index].value
            })
        }  
        callback({
            'status':res.status,
            'data':options
        })
    }).catch(err=>{
        callback({
            'status':err.status,
            'message':err.message
        })
    })
}
