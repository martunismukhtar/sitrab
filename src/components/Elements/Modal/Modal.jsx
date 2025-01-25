import { useAtom } from "jotai";
import React from "react";
import {
  activeModalAtom,
  coordinatesAtom,
  form_pengajuan_atom,
  isDrawingAtom,
  isOpenModal,
} from "../../../jotai/atoms";
import PropTypes from "prop-types";

const Modal = ({
  title = "Judul Modal",
  size = "md",
  children,
  className = "",
}) => {
  const [, resetForm] = useAtom(form_pengajuan_atom);
  const [openModalAtom, setIsOpenModal] = useAtom(isOpenModal);
  const [, setDrawing] = useAtom(isDrawingAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, setActiveModal] = useAtom(activeModalAtom);

  const [customSize, setCustomSize] = React.useState("sm:w-1/3");

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

  React.useEffect(() => {
    switch (size) {
      case "sm":
        setCustomSize("sm:w-1/4");
        break;
      case "base":
        setCustomSize("sm:w-1/3");
        break;
      case "md":
        setCustomSize("sm:w-1/2");
        break;
      case "lg":
        setCustomSize("sm:w-3/4");
        break;
      case "xl":
        setCustomSize("sm:w-4/5");
        break;
      default:
        setCustomSize("sm:w-1/2"); // Fallback ke 'md'
        break;
    }
  }, [size]);
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[99] flex items-center justify-center ${
          openModalAtom ? "opacity-100 visible" : "opacity-0 invisible"
        } ${className}`}
      >
        <div
          className={`bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full ${customSize} max-w-4xl  relative transform scale-95 ${
            openModalAtom
              ? "animate-fade-in opacity-100"
              : "animate-fade-out opacity-0"
          }`}
        >
          <div className="flex justify-between items-center p-3 border-b">
            <h5 className="font-semibold">{title}</h5>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white w-8 h-8"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>

          <div
            className="p-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};