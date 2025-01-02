import { useEffect, useState } from "react";
import InputForm from "../Elements/Input/Index";
import { activeModalAtom, coordinatesAtom, form_pengajuan_atom, hasil_intersect_atom, isLoadingAtom, setVisibleToast } from "../../jotai/atoms";
import { useAtom } from "jotai";
import SelectForm from "../Elements/SelectField/Index";
import FileInput from "../Elements/FileInput/Index";
import { StatusTanah } from "../../Services/status_tanah.service";
import { Kecamatan } from "../../Services/kecamatan.service";
import Button from "../Elements/Button";
import LoadingButton from "../Elements/Loading/LoadingButton";
import { UploadDocumentKRK } from "../../Services/upload_document.service";
import { SubmitKRK } from "../../Services/proses_krk.service";

const FormKRK = () => {
  const [, setActiveModal] = useAtom(activeModalAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [nilaiForm,] = useAtom(form_pengajuan_atom);
  const [hasil,] = useAtom(hasil_intersect_atom);
  const [status_tanah, set_status_tanah] = useState([]);
  const [kecamatan, set_kecamatan] = useState([]);

  const [, resetForm] = useAtom(form_pengajuan_atom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, setVisible] = useAtom(setVisibleToast)

  const [form_krk, setFormKrk] = useState({
      alamat:"",
      alamat_tanah:"",
      callfrom:"web",
      email:nilaiForm.email,
      gampong:"",
      id:hasil.id,
      jabatan:"",
      kecamatan:"",
      kegiatan:"",
      klasifikasi:"",
      koordinat:[],
      link_dokumen_tanah:"",
      luas_tanah:"",
      nama_dokumen_tanah:"",
      no_sertifikat:"",
      nomor_hp:nilaiForm.nomor_hp,
      pekerjaan:"",
      pemilik_tanah:"",
      pengaju:nilaiForm.pengaju,
      status_tanah:"",
    
  });
  const [lantai_bangunan, set_lantai] = useState([
    {
      lantai: 1,
      luas: 0,
    },
  ]);

  useEffect(() => {
    StatusTanah((res) => {
      if(res.status != 200){
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })
        return;
      }
      set_status_tanah(
        res.data.data.map((item) => {
          return { id: item.id, text: item.status };
        })
      );
    });
    Kecamatan((res) => {
      if(res.status != 200){      
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })
        return;
      }
      set_kecamatan(
        res.data.map((item) => {
          return { id: item.kode, text: item.nama };
        })
      );
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_post = {
      lantai_bangunan: lantai_bangunan,
      pengajuan: form_krk,
    }        
    setIsLoading(true);
    SubmitKRK(form_post, (res) => {        
      if(res.status == 200){
        setVisible({
          visible:true,
          message: "Pengajuan KRK berhasil",
          type:"success"
        })

        window.open(res.data.data, "_blank");            
        resetForm({
          pengaju: "",
          nomor_hp: "",
          tujuan: "",
          email: "",
          kegiatan: "",
        });
        setCoordinates([]);
        setIsLoading(false);
        setActiveModal(null);
      } else {
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })

      }      
    })
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setFormKrk((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const tambahLantai = (e) => {
    e.preventDefault();
    set_lantai([
      ...lantai_bangunan,
      {
        lantai: lantai_bangunan.length + 1,
        luas: null,
      },
    ]);
  };

  const removeLantai = (e, idx) => {
    e.preventDefault();
    set_lantai(lantai_bangunan.filter((item) => item.lantai !== idx));
  };

  const handleLantai = (e, idx) => {
    e.preventDefault();
    lantai_bangunan[idx].luas = e.target.value;
  };

  const uploadDocument = (file) => {
    UploadDocumentKRK(file, (res) => {
      if(res.status != 200) {
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })
        return;
      }
      form_krk.link_dokumen_tanah = res.data.full_url;
      form_krk.nama_dokumen_tanah = res.data.nama;
    })
  };

  return (
    <div className="mt-4 h-[600px] overflow-y-auto">
      <h2 className="font-bold">Data Pemohon</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="gap-4 m-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label="Nama Pemohon"
              required={false}
              type="text"
              placeholder="Pemohon"
              onChange={handleChange}
              name="pengaju"
              maxLength={50}
              value={form_krk.pengaju}
            ></InputForm>
            <InputForm
              label="Pekerjaan"
              required={false}
              type="text"
              placeholder="Pekerjaan"
              onChange={handleChange}
              name="pekerjaan"
              maxLength={100}
              value={form_krk.pekerjaan}
            ></InputForm>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label="Alamat"
              required={false}
              type="text"
              placeholder="Alamat"
              onChange={handleChange}
              name="alamat"
              maxLength={200}
              value={form_krk.alamat}
            ></InputForm>
            <InputForm
              label="Jabatan"
              required={false}
              type="text"
              placeholder="Jabatan"
              onChange={handleChange}
              name="jabatan"
              maxLength={100}
              value={form_krk.jabatan}
            ></InputForm>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label="Email"
              required={false}
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              maxLength={50}
              value={form_krk.email}
            ></InputForm>
            <InputForm
              label="No. HP Aktif"
              required={false}
              type="text"
              placeholder="No. HP"
              onChange={handleChange}
              name="nomor_hp"
              maxLength={20}
              value={form_krk.nomor_hp}
            ></InputForm>
          </div>
          <div>
            <h2>Keterangan Tanah</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label="Luas (ha)"
              required={false}
              type="number"
              placeholder="Luas"
              onChange={handleChange}
              name="luas_tanah"
              value={form_krk.luas_tanah}
            ></InputForm>
            <InputForm
              label="Atas Nama"
              required={false}
              type="text"
              placeholder="Pemilik"
              onChange={handleChange}
              maxLength={200}
              name="pemilik_tanah"
              value={form_krk.pemilik_tanah}
            ></InputForm>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <SelectForm
              label="Status Tanah"
              required={false}
              options={status_tanah}
              onChange={handleChange}
              name="status_tanah"
              value={form_krk.status_tanah}
            ></SelectForm>
            <InputForm
              label="No. Sertifikat"
              required={false}
              type="text"
              placeholder="Sertifikat"
              onChange={handleChange}
              name="no_sertifikat"
              maxLength={100}
              value={form_krk.no_sertifikat}
            ></InputForm>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label="Alamat Tanah"
              required={false}
              type="text"
              placeholder="Alamat"
              onChange={handleChange}
              name="alamat_tanah"
              maxLength={200}
              value={form_krk.alamat_tanah}
            ></InputForm>
            <SelectForm
              label="Kecamatan"
              required={false}
              options={kecamatan}
              onChange={handleChange}
              name="kecamatan"
              value={form_krk.kecamatan}
            ></SelectForm>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label="Gampong"
              required={false}
              type="text"
              placeholder="Gampng"
              onChange={handleChange}
              name="gampong"
              value={form_krk.gampong}
            ></InputForm>
            <FileInput
              label="Scan PDF Upload (maksimum 1MB)"
              required={false}
              type="file"
              placeholder="File"
              onChange={uploadDocument}
              name="userfile"
            />
          </div>
          <div className="mt-3 mb-3">
            <h2>Keterangan Bangunan</h2>
          </div>

          {lantai_bangunan.map((item, index) => {
            return (
              <div className="flex items-center space-x-4 mb-4" key={index}>
                {/* Label */}
                <label htmlFor="jumlah" className="text-slate-800 text-sm">
                  Lantai Bangunan {index + 1}
                </label>

                {/* Input */}
                <input
                  type="number"
                  id="luas"                  
                  onChange={(e) => handleLantai(e, index)}
                  name="luas"
                  required
                  className="text-sm border rounded py-2 px-3 placeholder-opacity-50 text-slate-700  w-1/2"
                />

                {/* Button Hapus */}
                {index > 0 && (
                    <Button className="bg-red-500 text-sm text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={(e)=>removeLantai(e, index)}
                    >
                    Hapus
                  </Button>
                )}
                

                {/* Button Tambah */}
                <Button
                  className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={tambahLantai}
                >
                  Tambah
                </Button>
              </div>
            );
          })}
        </div>
        <div className="w-full text-end mt-4">
        { isLoading ? <LoadingButton /> : <Button type="submit" className="button-blue mx-2">
          Ajukan
        </Button> }        
      </div>
      </form>
    </div>
  );
};

export default FormKRK;
