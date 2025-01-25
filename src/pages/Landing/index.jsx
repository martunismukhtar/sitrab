import React, { useEffect } from "react";
import LandingLayout from "../../layouts/landing";

import Modal from "../../components/Elements/Modal/Modal.jsx";
import Toast from "../../components/Elements/Toast/Index.jsx";

import {
  activeModalAtom,
  isOpenModal,
  isVisibleModal,
  setVisibleToast,
} from "../../jotai/atoms.js";
import { useAtom } from "jotai";
import FormPengajuan from "../../components/Fragments/FormPengajuan.jsx";
import HasilIntersect from "../../components/Fragments/HasilIntersect/Index.jsx";
import FormKRK from "../../components/Fragments/FormKRK.jsx";
import MapComponent from "../../components/Elements/MapComponent.jsx";

const LandingPage = () => {
  const [, setIsOpenModal] = useAtom(isOpenModal);

  const [activeModal] = useAtom(activeModalAtom);
  const [modalVisible] = useAtom(isVisibleModal);
  const [isVisible, setVisible] = useAtom(setVisibleToast);

  const [toast, setToast] = React.useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "" });
    }, 3000); // Toast akan hilang setelah 3 detik
  };

  useEffect(() => {
    setIsOpenModal(true);
  }, [activeModal, modalVisible, setIsOpenModal]);

  useEffect(() => {
    if (isVisible.visible) {
      if (isVisible.type === "error") {
        showToast(`Terjadi kesalahan : ${isVisible.message}`, "error");
        // setError(false);
        setVisible({
          visible: false,
        });
      } else {
        showToast(`${isVisible.message}`, "success");
        setVisible({
          visible: false,
        });
     
      }
    }
  }, [isVisible.visible, isVisible.message, isVisible.type, setVisible]);

  return (
    <LandingLayout>
      <MapComponent />

      {/* Form Pengajuan */}
      {activeModal === "pengajuan" && (
        <Modal
          title="Sistem Informasi Manajemen Tata Bangunan Dan Tata Ruang"
          size="lg"
          className={modalVisible}
        >
          <h5 className="m-2">
            Silahkan mengisi form untuk informasi pemanfaatan ruang
          </h5>
          <hr className="mx-2" />
          <FormPengajuan />
        </Modal>
      )}

      {/* modal untuk menampilkan Hasil intersect */}
      {activeModal === "intersect" && (
        <Modal title="Informasi Pemanfaatan Ruang" size="lg">
          <HasilIntersect />
        </Modal>
      )}

      {/* modal untuk form krk */}
      {activeModal === "krk" && (
        <Modal title="Form KRK" size="lg">
          <FormKRK />
        </Modal>
      )}

      {/* modal untuk form krk */}
      {activeModal === "aju_informasi" && (
        <Modal title="Info" size="base">
          <div className="text-center leading-loose">
            <div className="flex justify-center m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="on baz text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </div>
            <p>
              Terimakasih anda telah mengajukan surat permohonan informasi
              pemanfaatan ruang.
            </p>
            <p>
              Untuk surat informasi tersebut akan dikirim melalui email atau
              bisa datang langsung dinas PUPR Aceh Barat.
            </p>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ visible: false, message: "", type: "" })}
        />
      )}
    </LandingLayout>
  );
};

export default LandingPage;
