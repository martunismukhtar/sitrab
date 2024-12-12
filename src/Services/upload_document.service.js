import axios from "axios";

export const UploadDocumentKRK = async (event, callback) => {
  let url = `${import.meta.env.VITE_BASE_URL}/analisis/uploadDoc/`;
  var formData = new FormData();
  formData.append("file", event);
  formData.append("name", event.name);
  formData.append("size", event.size);
  formData.append("mime_type", event.type);
  //maksimum 5MB
  if (event.size > 5242880) {
    alert("Ukuran file melebihi batas maksimum");
    return false;
  }

  return axios
    .post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      callback({
        'status':res.status,
        'data':res.data
      });
    })
    .catch((err) => {
      callback({
        'status':err.status,
        'message':err.message
      })
    });
};
