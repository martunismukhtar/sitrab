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
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
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
          setActiveModal('aju_informasi');
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
      }
    );
  };
  return (
    <>
      <RTRW data={hasil.hasil_intersect.RTRW} />
      <RDTR data={hasil.hasil_intersect.RDTR} />
      <div className="m-3">
        <span>Total : {convertToFixed(hasil.total)} m2</span>
      </div>
      <div className="flex justify-between">
        <Button className="button-blue" 
          disabled={isLoading}
          onClick={() => setActiveModal("krk")}>
          Pengajuan KRK
        </Button>
        <div className="flex space-x-2">
          <Button
            className="button-blue"
            disabled={isLoading}
            onClick={() => {
              window.open(hasil.pdf);
            }}
          >
            Cetak Informasi
          </Button>
          <Button className="button-blue" 
            disabled={isLoading}
            onClick={pengajuanInformasi}>
            {isLoading ? "Loading..." : "Pengajuan Informasi"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;
