import React, { useEffect } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input/Index";
// import SelectForm from "../Elements/SelectField/Index";
import { JenisKegiatan } from "../../Services/jenis_kegiatan.service";
import { Kegiatan } from "../../Services/kegiatan.service";
// import SearchableSelect from "../Elements/SearchableSelect/Index";
import InputField from "../Elements/InputField";
import Table from "../Elements/Table";
import {
  activeModalAtom,
  coordinatesAtom,
  cursorAtom,
  form_pengajuan_atom,
  hasil_intersect_atom,
  isDrawingAtom,
  isLoadingAtom,
  isVisibleModal,
  setVisibleToast,
} from "../../jotai/atoms";
import { useAtom } from "jotai";
import { Intersect } from "../../Services/proses_intersect.service";
import LoadingButton from "../Elements/Loading/LoadingButton";
import SelectForm from "../Elements/SelectField/Index";

// import Select from 'react-select'

//analisis/get_jenis_kegiatan
const FormPengajuan = () => {
  const [, setActiveModal] = useAtom(activeModalAtom);
  const [, setVisibleModal] = useAtom(isVisibleModal);
  const [, changeCursor] = useAtom(cursorAtom);
  const [, setDrawing] = useAtom(isDrawingAtom);
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const [nilaiForm, setNilaiForm] = useAtom(form_pengajuan_atom);
  const [, setHasilIntersect] = useAtom(hasil_intersect_atom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const [klasifikasi, setDataKlasifikasi] = React.useState([]);
  const [kegiatan, setDataKegiatan] = React.useState([]);
  const [, setVisible] = useAtom(setVisibleToast)

  //handle manual coordinates
  const [formKoordinat, setFormKoordinat] = React.useState({
    longitude: "",
    latitude: "",
  });

  useEffect(() => {
    JenisKegiatan((res) => {
      if(res.status == 200){
        setDataKlasifikasi(res.data);
      }    
      else {
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })
        return;
      }
    });
    setDrawing(false);
  }, []);

  const SelectJenis = (e) => {
    const {value} = e.target    
    nilaiForm.klasifikasi = value;
    Kegiatan(value, (res) => {
      if(res.status == 200){        
        setDataKegiatan(res.data);
      } else {
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })
        return;
      }      
    });
  };

  // const SelectKegiatan = (e) => {
  //   nilaiForm.kegiatan = e.id;
  // };

  // const handleSelect = (option) => {
  //   console.log("Selected option:", option.value);
  // };

  const handleDelete = (row, idx) => {
    setCoordinates(coordinates.filter((item, index) => index !== idx));
  };

  const handleAddKoorinat = () => {
    if (formKoordinat.latitude == "" || formKoordinat.longitude == "") return;
    setCoordinates([...coordinates, formKoordinat]);
    setFormKoordinat({
      longitude: "",
      latitude: "",
    });
  };
  const handleAddKoorinatFromMap = () => {
    // setActiveModal(null);
    setVisibleModal("!invisible");
    changeCursor("progress");
    setDrawing(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNilaiForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setFormKoordinat((prevData) => ({
      ...prevData,
      [name]: value,
    }));    
  };
  const handleDeleteAll = () => {
    setCoordinates([]);
    setDrawing(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    nilaiForm.pengaju = e.target.pengaju.value;
    nilaiForm.nomor_hp = e.target.nomor_hp.value;
    nilaiForm.tujuan = e.target.tujuan.value;
    nilaiForm.email = e.target.email.value;
    let xy = [];
    coordinates.map((item) => {
      xy.push([item.longitude, item.latitude]);      
    });

    let titik_awal = xy[0], titik_akhir = xy[xy.length - 1];
    //koordinat yang diinput manual titik awak tidak sama dengan titik akhir
    //masukkan koordinat awal dan akhir
    if(titik_awal[0] !== titik_akhir[0] && titik_awal[1] !== titik_akhir[1]) {    
      xy.push([titik_awal[0], titik_awal[1]]);
    } 

    if(xy.length > 0 ) {
      nilaiForm.koordinat = xy;
    } else {
      setVisible({
        visible:true,
        message: "Koordinat tidak valid",
        type:"error"
      })     
      return;
    }
    setIsLoading(true);
    Intersect(nilaiForm, (res) => {
      if(res.status != 200) {
        setVisible({
          visible:true,
          message: res.message,
          type:"error"
        })
        setIsLoading(false);  
        return;
      } 
      setIsLoading(false);
      setHasilIntersect(res.data.data);
      setActiveModal("intersect");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden overflow-y-auto max-h-[250px] sm:max-h-[550px]">
        <div className="w-full mt-2 p-2">
          <InputForm
            label="Nama Pemohon"
            required={true}
            type="text"
            placeholder="Pemohon"
            onChange={handleChange}
            name="pengaju"
            value={nilaiForm.pengaju}
          ></InputForm>
          <InputForm
            label="No Telepon"
            type="text"
            required={true}
            placeholder="No Telepon"
            name="nomor_hp"
            value={nilaiForm.nomor_hp}
            onChange={handleChange}
          ></InputForm>
          <InputForm
            label="Email"
            type="email"
            required={true}
            placeholder="email"
            name="email"
            value={nilaiForm.email}
            onChange={handleChange}
          ></InputForm>
          <InputForm
            label="Tujuan Kegiatan"
            type="text"
            required={true}
            placeholder="Tujuan"
            name="tujuan"
            value={nilaiForm.tujuan}
            onChange={handleChange}
          ></InputForm>
          <SelectForm
            label="Klasifikasi"
            required={true}
            options={klasifikasi}
            value={nilaiForm.jenis}
            onChange={SelectJenis}
            name="jenis"
          ></SelectForm>         
          <SelectForm
            label="Jenis"
            required={true}
            options={kegiatan}
            value={nilaiForm.kegiatan}
            onChange={handleChange}
            name="kegiatan"
          ></SelectForm>    
          {/* <SearchableSelect
            options={kegiatan}
            required={true}
            label="Jenis"
            name="kegiatan"
            placeholder="-- Pilih --"
            onSelect={(e) => nilaiForm.kegiatan = e.id}
          /> */}
          {/* <SelectForm
            label="Jenis"
            required={true}
            options={kegiatan}
            value={nilaiForm.jenis}
            onChange={handleChange}
            name="kegiatan"
          ></SelectForm> */}
        </div>
        <div className="w-full mt-2 p-2">
          <div className="mb-4">
            <label
              className="block text-slate-800 text-sm mb-2"
              htmlFor="category"
            >
              Koordinat Lokasi Kegiatan
            </label>
            <div className="flex ">
              <InputField
                className="mr-2 w-6/12"
                onChange={handleManualChange}
                type="text"
                name="longitude"
                placeholder="Longitude"
              />
              <InputField
                onChange={handleManualChange}
                className="w-6/12"
                type="text"
                name="latitude"
                placeholder="Latitude"
              />
            </div>
          </div>
          <div className="mb-4 flex justify-end">
            <Button className="button-blue" onClick={handleAddKoorinat}>
              +
            </Button>
          </div>
          <div className="flex flex-wrap items-center text-red-600 ml-1">
            <span>Klik icon </span>
            <svg
              className="ml-1 mr-1 cursor-pointer"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleAddKoorinatFromMap}
            >
              <path
                d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                stroke="#0d6efd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span>untuk mengambil koordinat di peta</span>
          </div>

          <div className="mb-4 mt-4">
            {coordinates.length > 0 && (
              <>
                <div className="text-end mb-2">
                  <Button
                    type="submit"
                    className="button-red px-2 py-1"
                    onClick={handleDeleteAll}
                  >
                    Hapus semua koordinat
                  </Button>
                </div>
                <Table data={coordinates} onDelete={handleDelete} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full text-end">
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="button-blue">
            Menyiapkan Informasi
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormPengajuan;
