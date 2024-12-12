import { useAtom } from "jotai";
import React from "react";
import {
  activeModalAtom,
  coordinatesAtom,
  form_pengajuan_atom,
  isDrawingAtom,
  isOpenModal,
} from "../../../jotai/atoms";
import styles from "./styles.module.css";

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
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center  modal-background z-[99] ${
          openModalAtom ? styles.visible : styles.hidden
        } ${className}`}
      >
        <div
          className={`bg-white rounded-lg shadow dark:bg-gray-700 p-6 w-full sm:${size} max-w-4xl relative modal-container ${openModalAtom ? styles.visible : styles.hidden}`}
        >
          <div className="border-b-2 border-slate-600">
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
