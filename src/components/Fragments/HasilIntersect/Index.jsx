import {
  activeModalAtom,
  coordinatesAtom,
  form_pengajuan_atom,
  hasil_intersect_atom,
  isLoadingAtom,
  setVisibleToast,
} from "../../../jotai/atoms";
import { useAtom } from "jotai";
import RTRW from "./RTRW";
import RDTR from "./RDTR";
import Button from "../../Elements/Button";
import { convertToFixed } from "../../../Libs/common";
import { statusPengajuan } from "../../../Services/proses_status_pengajuan.service";

const Index = () => {
  const [hasil] = useAtom(hasil_intersect_atom);
  const [, setActiveModal] = useAtom(activeModalAtom);
  const [, setVisible] = useAtom(setVisibleToast);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, resetForm] = useAtom(form_pengajuan_atom);
  
  const pengajuanInformasi = () => {
    //ubah status = 2 pada tabel pengajuan
    setIsLoading(true);
    statusPengajuan(
      {
        id: hasil.id,
        status: 2,
      },
      (res) => {
        if(res.status != 200) {
          setVisible({
            visible: true,
            message: res.message,
            type: "error",
          });
          return;
        } else {
          setVisible({
            visible: true,
            message: "Pengajuan Informasi berhasil",
            type: "success",
          });
        }
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
      }
    );
  };
  return (
    <>
      <RTRW data={hasil.hasil_intersect.RTRW} />
      <RDTR data={hasil.hasil_intersect.RDTR} />
      <div className="m-3">
        <h3>Total : {convertToFixed(hasil.total)} m2</h3>
      </div>
      <div className="flex justify-between">
        <Button className="button-blue" onClick={() => setActiveModal("krk")}>
          Pengajuan KRK
        </Button>
        <div className="flex space-x-2">
          <Button
            className="button-blue"
            onClick={() => {
              window.open(hasil.pdf);
            }}
          >
            Cetak Informasi
          </Button>
          <Button className="button-blue" onClick={pengajuanInformasi}>
            Pengajuan Informasi
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;
