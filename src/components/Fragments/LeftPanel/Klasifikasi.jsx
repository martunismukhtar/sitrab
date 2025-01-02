import { useContext } from "react";
import {
  initialMapSizeAtom,
  layersMapAtom,
  list_selectedClassAtom,
  setVisibleToast,
} from "../../../jotai/atoms";
import { useAtom } from "jotai";
import Checkbox from "../../Elements/Checkbox/Index";
import { Capitalize } from "../../../Libs/common";
import MapContext from "../../../context/MapContext";

const Klasifikasi = () => {
  const [list_selected_layers, setSelectedLayer] = useAtom(
    list_selectedClassAtom
  );
  const [, setLayersMap] = useAtom(layersMapAtom);
  const [, setVisible] = useAtom(setVisibleToast);
  // const [map_size] = useAtom(initialMapSizeAtom);
  const { peta } = useContext(MapContext);

  const updateSelectedClassLayer = (e) => {
    const { name } = e.target;

    setSelectedLayer((prevLayers) => {
      const updatedLayers = prevLayers.map((layerInfo) => {
        if (layerInfo.layer === name) {
          layerInfo.visible = !layerInfo.visible;
        }
        return layerInfo;
      });
      return updatedLayers;
    });

    setLayersMap((prevLayers) => {
      const updatedLayers = prevLayers.map((layerInfo) => {
        if (layerInfo.get("layerid") === name) {
          layerInfo.setVisible(!layerInfo.getVisible());
        }
        return layerInfo;
      });
      return updatedLayers;
    });
  };
  const zoomToExtent = (e) => {
    if (!e[0] || !e[1] || !e[2] || !e[3]) {
      setVisible({
        visible: true,
        message: "Data tidak boleh kosong",
        type: "error",
      });
    } else {      
      peta.getView().fit(e, { size: peta.getSize(), padding: [50, 50, 50, 50] });
    }
  };
  return (
    <li className="mt-2">
      <span className="font-[400] text-slate-950">Klasifikasi</span>
      <ul>
        {list_selected_layers.length > 0 &&
          list_selected_layers.map((layerInfo, index) => (
            <li
              key={index}
              className="ul-child m-2 pl-[10px] flex justify-between"
            >
              <Checkbox
                label={Capitalize(layerInfo.title)}
                name={layerInfo.layer}
                checked={layerInfo.visible === true ? true : false}
                onChange={(e) => updateSelectedClassLayer(e)}
              />
              <svg
                onClick={() => zoomToExtent(layerInfo.extent)}
                className={`cursor-pointer ${
                  layerInfo.visible ? "opacity-100" : "opacity-0"
                }`}
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 14C10 14.5523 10.4477 15 11 15C11.5523 15 12 14.5523 12 14V12H14C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10H12V8C12 7.44772 11.5523 7 11 7C10.4477 7 10 7.44772 10 8V10H8C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12H10V14Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default Klasifikasi;
