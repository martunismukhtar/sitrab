import React, { useEffect, useRef } from "react";
import LandingLayout from "../../layouts/landing";

import "ol/ol.css";
import { Map, View } from "ol";
import MapContext from "../../context/MapContext";
import { transform } from "ol/proj";
import Draw from "ol/interaction/Draw";
import Modal from "../../components/Elements/Modal/Modal.jsx";
import Toast from "../../components/Elements/Toast/Index.jsx";

import {
  activeModalAtom,
  coordinatesAtom,
  cursorAtom,
  initialExtentAtom,
  initialMapSizeAtom,
  initialResolutionAtom,
  isClickable,
  isDrawingAtom,  
  isOpenModal,
  isVisibleModal,
  setVisibleToast,
} from "../../jotai/atoms.js";
import { useAtom } from "jotai";
import { LayerInfo } from "../../Services/layer.service.js";
import Info from "../../components/Elements/Table/Info/index.jsx";
import FormPengajuan from "../../components/Fragments/FormPengajuan.jsx";
import VectorSource from "ol/source/Vector.js";
import LeftPanel from "../../components/Fragments/LeftPanel/LeftPanel.jsx";
import DynamicTile from "../../Layers/DynamicTile.jsx";
import { defaults as defaultInteractions } from "ol/interaction.js";
import NavigationToolPanel from "../../components/Fragments/NavigationToolPanel/Index.jsx";
import HasilIntersect from "../../components/Fragments/HasilIntersect/Index.jsx";
import FormKRK from "../../components/Fragments/FormKRK.jsx";

const LandingPage = () => {
  const [, setIsOpenModal] = useAtom(isOpenModal);

  const [peta, setMap] = React.useState(null);
  const [isDrawing] = useAtom(isDrawingAtom);
  const [activeModal, setActiveModal] = useAtom(activeModalAtom);
  const [, setInitialExtent] = useAtom(initialExtentAtom);
  const [, setInitialMapSize] = useAtom(initialMapSizeAtom);
  const [, setInitialResolution] = useAtom(initialResolutionAtom);
  const [, changeCursor] = useAtom(cursorAtom);
  const [modalVisible, setVisibleModal] = useAtom(isVisibleModal);
  const [isClick] = useAtom(isClickable);
  const [judulModal, setJudulModal] = React.useState("");
  const [layerInfo, setLayerInfo] = React.useState([]);

  const [cursor] = useAtom(cursorAtom);
  const [isVisible, setVisible] = useAtom(setVisibleToast)

  const mapRef = useRef();
  const mapInstance = useRef(null);
  const [, setCoordinates] = useAtom(coordinatesAtom);

  // const [isOpen, setIsOpen] = React.useState(false);

  const vectorDrawSource = useRef(new VectorSource()).current;
  const drawInteractionRef = useRef(null);

  // const handleToggle = () => setIsOpen(!isOpen);

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

  let lat = 4.49106,
	lng = 96.18403;
  useEffect(() => {
    mapInstance.current = new Map({
      target: mapRef.current,      
      view: new View({
        center: transform(
          [parseFloat(lng), parseFloat(lat)],
          "EPSG:4326",
          "EPSG:3857"
        ),
        minZoom: 6,
        projection: "EPSG:3857",
        zoom: 10,
      }),
      controls: [],
      interactions: defaultInteractions({
        dragAndDrop: false,
        // dragPan: false,
        keyboardPan: false,
        keyboardZoom: false,
        // mouseWheelZoom: false,
        // pointer: false,
        select: false,
      }),
    });
    // mapObject.setTarget(mapRef.current);
    setMap(mapInstance.current);

    //ambil extent awal
    let extent = mapInstance.current.getView().calculateExtent(mapInstance.current.getSize());
    setInitialExtent(extent);
    setInitialMapSize(mapInstance.current.getSize());
    setInitialResolution(mapInstance.current.getView().getResolution());

    // Cleanup when component unmounts
    return () => mapInstance.current.setTarget(null);
  }, []);

  useEffect(() => {
    if (peta && isClick) {
      changeCursor("pointer");
      peta.on("click", (e) => {
        let feature = peta.forEachLayerAtPixel(e.pixel, function (feature) {
          return feature;
        });
        if (feature && feature.getProperties().layerid) {
          let layer = feature.getProperties().layerid,
            kode = e.coordinate[0] + "," + e.coordinate[1];
          LayerInfo(layer, kode, (res) => {
            setJudulModal(feature.getProperties().layerid);
            setLayerInfo(res.data.data);
            setActiveModal("info");
            setIsOpenModal(true);
          });
        }
      });
    } else {
      changeCursor("grab");
    }
  }, [peta, isClick]);

  useEffect(() => {
    setIsOpenModal(true);
  }, [activeModal, modalVisible]);

  useEffect(() => {
    if (isDrawing && peta) {
      // Tambahkan interaksi menggambar jika isDrawing aktif
      const drawInteraction = new Draw({
        source: vectorDrawSource,
        type: "Polygon",
      });
      drawInteractionRef.current = drawInteraction;

      drawInteraction.on("drawend", (e) => {
        let features = e.feature;
        let geom = features.getGeometry();
        let wgs_coordinates = [];
        for (let i = 0; i < geom.getCoordinates()[0].length; i++) {
          let transform_to_wgs = transform(
            [
              parseFloat(geom.getCoordinates()[0][i][0]),
              parseFloat(geom.getCoordinates()[0][i][1]),
            ],
            "EPSG:3857",
            "EPSG:4326"
          );
          wgs_coordinates.push({
            longitude: transform_to_wgs[0],
            latitude: transform_to_wgs[1],
          });
        }
        setCoordinates(wgs_coordinates);
        setActiveModal("pengajuan");
        changeCursor("default");

        //remove drawInteraction
        peta.removeInteraction(drawInteractionRef.current);
        drawInteractionRef.current = null;
        setVisibleModal("visible");
        console.log("draw polygon");
      });

      peta.addInteraction(drawInteraction);
    } else if (drawInteractionRef.current) {
      // Hapus interaksi menggambar jika isDrawing tidak aktif
      peta.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }
  }, [isDrawing]);

  useEffect(() => {

    if(isVisible.visible) {
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
        // setError(false);
      }
    }

  }, [isVisible.visible]);

  useEffect(() => {
    const handleResize = () => {
      if (mapInstance.current) {
        mapInstance.current.updateSize(); // Refresh map size
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MapContext.Provider value={{ peta }}>
      <LandingLayout>        
        <div
          ref={mapRef}
          className="ol-map w-full relative h-full min-h-screen"
          style={{ cursor: cursor }}
        >
          <DynamicTile />
          <LeftPanel />
          <NavigationToolPanel />
        </div>
      </LandingLayout>

      {/* Modal Info ketika layer diklik */}
      {activeModal === "info" && (
        <Modal title={judulModal}>
          <Info data={layerInfo} />
        </Modal>
      )}

      {/* Form Pengajuan */}
      {activeModal === "pengajuan" && (
        <Modal
          title="Sistem Informasi Manajemen Tata Bangunan Dan Tata Ruang"
          size="w-3/4"
          className={modalVisible}
        >
          <h2 className="m-2">
            Silahkan mengisi form untuk informasi pemanfaatan ruang
          </h2>
          <hr className="mx-2" />
          <FormPengajuan />
        </Modal>
      )}

      {/* modal untuk menampilkan Hasil intersect */}
      {activeModal === "intersect" && (
        <Modal title="Informasi Pemanfaatan Ruang" size="w-3/4">
          <HasilIntersect />
        </Modal>
      )}

      {/* modal untuk form krk */}
      {activeModal === "krk" && (
        <Modal title="Form KRK" size="w-3/4">
          <FormKRK />
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
    </MapContext.Provider>
  );
};

export default LandingPage;
