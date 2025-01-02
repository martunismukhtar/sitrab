import { tooglePanelAtom } from "../../../jotai/atoms";
import { useAtom } from "jotai";

import AsideHeader from "./AsideHeader";
import DaftarPetaDasar from "./DaftarPetaDasar";
import DaftarPeta from "./DaftarPeta";
import Klasifikasi from "./Klasifikasi";

function LeftPanel() {
  const [panel] = useAtom(tooglePanelAtom);

  return (
    <aside
      className={`transition-height duration-300 ease-linear w-[23rem] sm:w-96 bg-white border-r h-auto absolute top-0 left-0 sm:top-[40px] sm:left-[40px] block z-[2] rounded-md`}
    >
      <AsideHeader />
      <ul
        className={`transition-all duration-300 ease-linear ul-parent ${panel ? `h-[calc(100vh-150px)] sm:h-[calc(100vh-200px)] overflow-y-auto ` : "overflow-y-hidden h-0" }  ml-2 `}        
      >
        <DaftarPetaDasar />
        <DaftarPeta judul="Kecamatan" layer="kecamatan" />
        <DaftarPeta judul="Jaringan Jalan" layer="jaringan_jalan" />
        <Klasifikasi />
        <DaftarPeta judul="RTRW" layer="pola_ruang" />
        <DaftarPeta judul="RDTR" layer="rd_ar_pr" />
        <DaftarPeta judul="Moratorium Gambut" layer="gambut" />
      </ul>
    </aside>
  );
}

export default LeftPanel;
