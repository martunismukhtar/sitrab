import React from "react";
import { Map, View } from "ol";

import MapContext from "../../context/MapContext";
import { transform } from "ol/proj";
import Modal from "../../components/Elements/Modal/Modal.jsx";

import {
  activeModalAtom,
  cursorAtom,
  initialExtentAtom,
  initialMapSizeAtom,
  initialResolutionAtom,
  isClickable,
  isOpenModal,
  setVisibleToast,
} from "../../jotai/atoms.js";
import { useAtom } from "jotai";
import { LayerInfo } from "../../Services/layer.service.js";
import Info from "../../components/Elements/Table/Info/index.jsx";
import LeftPanel from "../../components/Fragments/LeftPanel/LeftPanel.jsx";
import DynamicTile from "../../Layers/DynamicTile.jsx";
import { defaults as defaultInteractions } from "ol/interaction.js";
import NavigationToolPanel from "../../components/Fragments/NavigationToolPanel/Index.jsx";
import { judul } from "../../Libs/common.js";
import LoadingPanel from "./Loading/LoadingPanel.jsx";
import DrawComponent from "./Draw/Index.jsx";

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
  const [activeModal, setActiveModal] = useAtom(activeModalAtom);
  const [, setVisible] = useAtom(setVisibleToast);
  const [, setIsOpenModal] = useAtom(isOpenModal);
  const [judulModal, setJudulModal] = React.useState("");
  const [layerInfo, setLayerInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
  }, [lat, lng, setInitialExtent, setInitialMapSize, setInitialResolution]);

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
  }, [peta, isClick, changeCursor, setVisible, setActiveModal, setIsOpenModal]);

  return (
    <MapContext.Provider value={{ peta }}>
      <div
        ref={mapRef}
        className="ol-map w-full h-full min-h-screen relative"
        style={{ cursor: cursor }}
      >
        <DynamicTile />
        <DrawComponent />
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
