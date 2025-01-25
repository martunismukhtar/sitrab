import React, { useContext, useRef } from "react";
import {
  activeModalAtom,
  coordinatesAtom,
  cursorAtom,
  isDrawingAtom,
//   isOpenModal,
  isVisibleModal,
} from "../../../jotai/atoms";
import { useAtom } from "jotai";
import { Draw } from "ol/interaction";
import { Overlay } from "ol";
import MapContext from "../../../context/MapContext";
import VectorSource from "ol/source/Vector";
import { getArea } from "ol/sphere";
import { Polygon } from "ol/geom";
import { transform } from "ol/proj";
import { unByKey } from "ol/Observable";

const DrawComponent = () => {
  const { peta } = useContext(MapContext);
  const [isDrawing] = useAtom(isDrawingAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  const [, setActiveModal] = useAtom(activeModalAtom);
  const [, changeCursor] = useAtom(cursorAtom);
  const [, setVisibleModal] = useAtom(isVisibleModal);
//   const [, setIsOpenModal] = useAtom(isOpenModal);

  const vectorSourceData = new VectorSource();
  const vectorDrawSource = useRef(vectorSourceData).current;
  const drawInteractionRef = useRef(null);
//   const batalDraw = React.useRef(null);

  const [, setMeasureTooltip] = React.useState(null);
  const [, setHelpTooltip] = React.useState(null);

  React.useEffect(() => {
    if (isDrawing && peta) {
      // Tambahkan interaksi menggambar jika isDrawing aktif
      const drawInteraction = new Draw({
        source: vectorDrawSource,
        type: "Polygon",
      });
      drawInteractionRef.current = drawInteraction;

      let sketch;
      let measureTooltipElement;
      // let helpTooltipElement;
      let listener;

      const createTooltip = (className) => {
        const element = document.createElement("div");
        element.className = `tooltip ${className}`;
        const overlay = new Overlay({
          element,
          offset: [0, -15],
          positioning: "bottom-center",
        });
        peta.addOverlay(overlay);
        return { element, overlay };
      };

      const { element: newMeasureElement, overlay: newMeasureOverlay } =
        createTooltip("tooltip-measure");
      measureTooltipElement = newMeasureElement;
      setMeasureTooltip(newMeasureOverlay);

      const { overlay: newHelpOverlay } = createTooltip("hidden");
      // helpTooltipElement = newHelpElement;
      setHelpTooltip(newHelpOverlay);

      drawInteraction.on("drawstart", (e) => {
        // batalDraw.current.style.display = "block";
        sketch = e.feature;
        listener = sketch.getGeometry().on("change", (e) => {
          const geom = e.target;
          let output;
          let tooltipCoord;

          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          }

          measureTooltipElement.innerHTML = output;
          newMeasureOverlay.setPosition(tooltipCoord);
        });
      });
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

        measureTooltipElement.className = "tooltip tooltip-static";
        newMeasureOverlay.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement.className = "hidden";
        measureTooltipElement = null;

        if (listener) {
          unByKey(listener);
        }

        //remove drawInteraction
        peta.removeInteraction(drawInteractionRef.current);
        drawInteractionRef.current = null;
        setVisibleModal("visible");
        // batalDraw.current.style.display = "none";
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
  }, [
    isDrawing,
    changeCursor,
    peta,
    setVisibleModal,
    setActiveModal,
    setCoordinates,
    vectorDrawSource,
  ]);

  const formatArea = (polygon) => {
    // ST_Transform(rd_ar_pr.geom, 3857) mereproyeksikan data ke EPSG:3857 (satuan meter).
    // ST_Area(...) / 10000 mengonversi area dari m² ke hektar (1 hektar = 10,000 m²).
    // Menghitung luas area, getArea mengembalikan luas dalam m2
    const area = getArea(polygon);
    //konversi m2 ke km2 dibagi 1.000.000
    //konversi m2 ke ha dibagi 10.000
    return area > 10000
      ? `${(area / 10000).toFixed(2)} ha`
      : `${area.toFixed(2)} m²`;
  };

//   const batalMenggambar = () => {
//     // peta.removeInteraction(drawInteractionRef.current);
//     // if (drawInteractionRef.current) {
//     //     peta.removeInteraction(drawInteractionRef.current);
//     //   }
//     vectorSourceData.clear();
//     drawInteractionRef.current = null;

//     changeCursor("default");
//     setIsOpenModal(true);
//     setActiveModal("pengajuan");
//     setVisibleModal("visible");
//     batalDraw.current.style.display = "none";
//     document.querySelector(".tooltip-measure").className = "hidden";
//   };

  return null
//   return (
//     <div className="z-50 px-3 py-2 rounded absolute top-0 left-1/2 transform -translate-x-1/2 items-center overflow-hidden text-white bg-red-400" 
//         ref={batalDraw} 
//         style={{ display: 'none' }}
//     >
//       <span className="px-5 py-1.5 text-[12px] font-medium">Batal Menggambar</span>
//       <button
//         onClick={batalMenggambar}
//         className="inline-flex items-center justify-center w-8 h-8 bg-red-600 transition-color focus:outline-none focus:ring"
//         type="button"
//       >
//         <span className="sr-only"> Close </span>
//         <svg
//           className="w-3 h-3"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//     </div>
//   );
};
export default DrawComponent;
