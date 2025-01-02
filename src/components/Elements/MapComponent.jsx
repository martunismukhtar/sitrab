import React, { useRef } from "react";
import { Map, View } from "ol";
// import { ScaleLine } from "ol/control";

// import Print from "ol-ext/control/Print";

import MapContext from "../../context/MapContext";
import { transform } from "ol/proj";
import Draw from "ol/interaction/Draw";
import Modal from "../../components/Elements/Modal/Modal.jsx";

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
import VectorSource from "ol/source/Vector.js";
import LeftPanel from "../../components/Fragments/LeftPanel/LeftPanel.jsx";
import DynamicTile from "../../Layers/DynamicTile.jsx";
import { defaults as defaultInteractions } from "ol/interaction.js";
import NavigationToolPanel from "../../components/Fragments/NavigationToolPanel/Index.jsx";
import { judul } from "../../Libs/common.js";
import LoadingPanel from "./Loading/LoadingPanel.jsx";
// import CetakPeta from "../../components/Fragments/CetakPeta.jsx";

const MapComponent = () => {
  let lat = 4.49106,
    lng = 96.18403;

  const [peta, setMap] = React.useState(null);
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const [, setInitialExtent] = useAtom(initialExtentAtom);
  const [, setInitialMapSize] = useAtom(initialMapSizeAtom);
  const [, setInitialResolution] = useAtom(initialResolutionAtom);
  const [cursor, changeCursor] = useAtom(cursorAtom);
  const [isClick] = useAtom(isClickable);
  const [isDrawing] = useAtom(isDrawingAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, setVisibleModal] = useAtom(isVisibleModal);
  const [activeModal, setActiveModal] = useAtom(activeModalAtom);
  const [, setVisible] = useAtom(setVisibleToast);
  const [, setIsOpenModal] = useAtom(isOpenModal);

  const [judulModal, setJudulModal] = React.useState("");
  const [layerInfo, setLayerInfo] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const vectorDrawSource = useRef(new VectorSource()).current;
  const drawInteractionRef = useRef(null);

  React.useEffect(() => {
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
    let extent = mapInstance.current
      .getView()
      .calculateExtent(mapInstance.current.getSize());
    setInitialExtent(extent);
    setInitialMapSize(mapInstance.current.getSize());
    setInitialResolution(mapInstance.current.getView().getResolution());

    // Cleanup when component unmounts
    return () => mapInstance.current.setTarget(null);
  }, []);

  React.useEffect(() => {
    if (peta && isClick) {
      changeCursor("pointer");
      peta.on("click", (e) => {
        let feature = peta.forEachLayerAtPixel(e.pixel, function (feature) {
          return feature;
        });
        if (feature && feature.getProperties().layerid) {
          let layer = feature.getProperties().layerid,
            kode = e.coordinate[0] + "," + e.coordinate[1];

          setLoading(true);
          LayerInfo(layer, kode, (res) => {
            if (res.status == 200) {
              let njudul = judul(feature.getProperties().layerid);
              if (feature.getProperties().layerid === "rd_ar_pr")
                njudul = "RDTR";

              setJudulModal(njudul);
              setLayerInfo(res.data.data);
              setActiveModal("info");
              setIsOpenModal(true);
              setLoading(false);
            } else {
              setLoading(false);
              setVisible({
                visible: true,
                message: res.message,
                type: "error",
              });
              return;
            }
          });
        }
      });
    } else {
      changeCursor("grab");
    }
  }, [peta, isClick]);

  React.useEffect(() => {
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
      });

      peta.addInteraction(drawInteraction);
    } else if (drawInteractionRef.current) {
      // Hapus interaksi menggambar jika isDrawing tidak aktif
      peta.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }

    return () => {
      //unmount
      if (drawInteractionRef.current) {
        peta.removeInteraction(drawInteractionRef.current);
      }
    };
  }, [isDrawing]);

  return (
    <MapContext.Provider value={{ peta }}>
      <div
        ref={mapRef}
        className="ol-map w-full h-full min-h-screen relative"
        style={{ cursor: cursor }}
      >
        <DynamicTile />
        <LeftPanel />
        <NavigationToolPanel />
      </div>

      {loading ? (
        <LoadingPanel />
      ) : (
        activeModal === "info" && (
          <Modal title={judulModal} size="base">
            <Info data={layerInfo} />
          </Modal>
        )
      )}
    </MapContext.Provider>
  );
};

export default MapComponent;
