import React, { useEffect, useRef } from "react";
import LandingLayout from "../../layouts/landing";

import "ol/ol.css";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import MapContext from "../../context/MapContext";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
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
  isErrorAtom,
  isOpenModal,
  isVisibleModal,
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
import { TileImage } from "ol/source.js";

const LandingPage = () => {
  const [, setIsOpenModal] = useAtom(isOpenModal);
  const [activeModal, setActiveModal] = useAtom(activeModalAtom);
  const [cursor] = useAtom(cursorAtom);
  const [isDrawing] = useAtom(isDrawingAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, changeCursor] = useAtom(cursorAtom);
  const [, setInitialExtent] = useAtom(initialExtentAtom);
  const [, setInitialMapSize] = useAtom(initialMapSizeAtom);
  const [, setInitialResolution] = useAtom(initialResolutionAtom);
  const [isClick] = useAtom(isClickable);
  const [modalVisible, setVisibleModal] = useAtom(isVisibleModal);

  const [layerInfo, setLayerInfo] = React.useState([]);
  const [judulModal, setJudulModal] = React.useState("");
  const [peta, setMap] = React.useState(null);
  const mapRef = useRef();
  const vectorDrawSource = useRef(new VectorSource()).current;
  const drawInteractionRef = useRef(null);
  const [isError, setError] = useAtom(isErrorAtom);

  const [toast, setToast] = React.useState({
    visible: false,
    message: "",
    type: "error",
  });

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "" });
    }, 5000); // Toast akan hilang setelah 3 detik
  };

  let lat = 5.556109,
    lng = 95.377227;
  useEffect(() => {
    const mapObject = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          layerid: "osm",
          visible: true,
        }),
        new TileLayer({
          source: new TileImage({
            url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga",
            crossOrigin: "anonymous",
          }),
          layerid: "google",
          visible: false,
        }),
      ],
      view: new View({
        center: transform(
          [parseFloat(lng), parseFloat(lat)],
          "EPSG:4326",
          "EPSG:3857"
        ),
        minZoom: 6,
        projection: "EPSG:3857",
        zoom: 12,
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
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    //ambil extent awal
    let extent = mapObject.getView().calculateExtent(mapObject.getSize());
    setInitialExtent(extent);
    setInitialMapSize(mapObject.getSize());
    setInitialResolution(mapObject.getView().getResolution());

    // Bersihkan interaksi saat komponen di-unmount
    return () => mapObject.setTarget(undefined);
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
    if (isError.status) {
      showToast(`Terjadi kesalahan : ${isError.message}`, "error");
      setError(false);
    }
  }, [isError.status]);

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
        <Modal title="Hasil Intersect" size="w-3/4">
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
