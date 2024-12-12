import { useAtom } from "jotai";
import React from "react";
import {
  activeModalAtom,
  coordinatesAtom,
  form_pengajuan_atom,
  isDrawingAtom,
  isOpenModal,
} from "../../../jotai/atoms";

const Modal = ({
  title = "Judul Modal",
  size = "w-1/3",
  children,
  className = "",
}) => {
  const [, resetForm] = useAtom(form_pengajuan_atom);
  const [openModalAtom, setIsOpenModal] = useAtom(isOpenModal);
  const [, setDrawing] = useAtom(isDrawingAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, setActiveModal] = useAtom(activeModalAtom);

  const handleCloseModal = () => {
    setIsOpenModal(false);

    //reset form
    resetForm({
      pengaju: "",
      nomor_hp: "",
      tujuan: "",
      kegiatan: "",
    });

    //set drawing false
    setDrawing(false);
    //hapus koordinat
    setCoordinates([]);
    //set modal hidden
    setActiveModal(null);
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-[99] ${
          openModalAtom ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${className}`}
      >
        <div
          className={`bg-white rounded-lg shadow dark:bg-gray-700 p-6 w-full sm:${size} max-w-4xl relative transform scale-95 ${openModalAtom ? 'animate-fade-in opacity-100' : 'animate-fade-out opacity-0'}`}
        >
          <div className="border-b-[1px] border-[#030083]">
            <h2 className="text-base text-slate-950 font-bold mb-2">{title}</h2>
          </div>
          <div>{children}</div>

          <button
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
