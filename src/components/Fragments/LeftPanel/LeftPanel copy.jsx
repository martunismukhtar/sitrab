import React, { useContext } from "react";
import {
  initialMapSizeAtom,
  layersMapAtom,
  list_layersAtom,
  list_selectedClassAtom,
  setVisibleToast,
  tooglePanelAtom,
} from "../../../jotai/atoms";
import { useAtom } from "jotai";
import Checkbox from "../../Elements/Checkbox/Index";
import RadioButton from "../../Elements/RadioButton/Index";
import MapContext from "../../../context/MapContext";
import { Capitalize } from "../../../Libs/common";
import Legend from "../Legend/Index";

function LeftPanel() {
  const [, setLayersMap] = useAtom(layersMapAtom);
  const [, setLayers] = useAtom(list_layersAtom);
  const [panel, tooglePanel] = useAtom(tooglePanelAtom);
  const { peta } = useContext(MapContext);
  const [list_layers] = useAtom(list_layersAtom);
  const [map_size, ] = useAtom(initialMapSizeAtom);
  const [list_selected_layers, setSelectedLayer] = useAtom(
    list_selectedClassAtom
  );
  const [, setVisible] = useAtom(setVisibleToast)

  const [baseLayer, setBaseLayer] = React.useState("google");

  const handleChangeBaseLayer = (e) => {
    setBaseLayer(e.target.value);

    const layers = peta.getLayers().getArray();
    layers.forEach((layer) => {
      const layerName = layer.get("layerid");
      if (e.target.value === "osm" && layerName === "osm") {
        layer.setVisible(true);
      } else if (e.target.value === "google" && layerName === "google") {
        layer.setVisible(true);
      } else {
        layer.setVisible(false);
      }
    });
  };

  const toggleVisibility = (e) => {
    const { name } = e.target;

    setLayersMap((prevLayers) => {
      const updatedLayers = prevLayers.map((layerInfo) => {
        if (layerInfo.get("layerid") === name) {
          layerInfo.setVisible(!layerInfo.getVisible());
        }
        return layerInfo;
      });
      return updatedLayers;
      // return [...updatedLayers];
    });

    //update layers
    setLayers((prevLayers) => {
      const updatedLayers = prevLayers.map((layerInfo) => {
        if (layerInfo.layer === name) {
          layerInfo.visible = !layerInfo.visible;
        }
        return layerInfo;
      });
      return updatedLayers;
    });
  };

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

  const zoomToExtent=(e)=>{    
    if(!e[0] || !e[1] || !e[2] || !e[3]) {
      setVisible({
        visible:true,
        message:"Data tidak boleh kosong",
        type:"error"
      })
    } else {
      peta.getView().fit(e, map_size);
    }

  }

  return (
    <aside
      className={`transition-all duration-300 ease-in-out w-[23rem] sm:w-96 bg-white border-r ${
        panel ? "h-full sm:h-3/4" : "h-0"
      } absolute top-0 left-0 sm:top-[40px] sm:left-[40px] block z-[2] rounded-md`}
    >
      <div className="p-[5px] border-b-2 bg-[#fbfbfb] flex justify-between border-b-[#e9e9e9] rounded-md">
        <div className="font-bold text-slate-900 dark:text-slate-200 text-base">
          Daftar Peta
        </div>
        <div
          className="pr-3 font-bold text-slate-950 text-lg cursor-pointer"
          onClick={() => tooglePanel(!panel)}
        >
          <svg
            className={`${panel ? "rotate-180" : ""}`}
            fill="#367ae7"
            width="24px"
            height="24px"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
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
              <title>angle-double-line</title>{" "}
              <path
                className="clr-i-outline clr-i-outline-path-1"
                d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"
              ></path>
              <path
                className="clr-i-outline clr-i-outline-path-2"
                d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"
              ></path>{" "}
              <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>{" "}
            </g>
          </svg>
        </div>
      </div>
      <ul
        className={`ul-parent ${
          panel ? "opacity-100 visible h-[calc(100vh-130px)] sm:h-[calc(100vh-40%)]" : "invisible opacity-100 h-0"
        } ml-2 overflow-y-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pb-[5px]`}
      >
        <li className="flex">
          <span className="font-[400] text-slate-950">Peta Dasar</span>
        </li>
        <li>
          <ul>
            <li className="pl-[10px] pt-[5px] ml-2">
              <RadioButton
                label="OSM"
                name="base_layer"
                value="osm"
                selectedValue={baseLayer}
                onChange={handleChangeBaseLayer}
              />
              <RadioButton
                label="Google"
                name="base_layer"
                value="google"
                selectedValue={baseLayer}
                onChange={handleChangeBaseLayer}
              />
            </li>
          </ul>
        </li>
        <li className="mt-2">
          <span className="font-[400] text-slate-950">Kecamatan</span>
          <ul>
            {list_layers.length > 0 &&
              list_layers
                .filter((lyr) => lyr.layer === "kecamatan")
                .map((layerInfo, index) => (
                  <li key={index} className="ul-child m-2 pl-[10px]">
                    <Checkbox
                      label={layerInfo.title}
                      name={layerInfo.layer}
                      checked={layerInfo.visible === true ? true : false}
                      onChange={(e) => toggleVisibility(e)}
                    />
                    <div
                      className={`ml-6 transition-all duration-300 ease-in-out ${
                        layerInfo.visible === true ? "block" : "hidden"
                      }`}
                    >
                      <Legend src={layerInfo.layer} />
                    </div>
                  </li>
                ))}
          </ul>
        </li>
        <li className="mt-2">
          <span className="font-[400] text-slate-950">Jaringan Jalan</span>
          <ul>
            {list_layers.length > 0 &&
              list_layers
                .filter((lyr) => lyr.layer === "jaringan_jalan")
                .map((layerInfo, index) => (
                  <li key={index} className="ul-child m-2 pl-[10px]">
                    <Checkbox
                      label={layerInfo.title}
                      name={layerInfo.layer}
                      checked={layerInfo.visible === true ? true : false}
                      onChange={(e) => toggleVisibility(e)}
                    />
                    <div
                      className={`ml-6 transition-all duration-300 ease-in-out ${
                        layerInfo.visible === true ? "block" : "hidden"
                      }`}
                    >
                      <Legend src={layerInfo.layer} />
                    </div>
                  </li>
                ))}
          </ul>
        </li>
        <li className="mt-2">
          <span className="font-[400] text-slate-950">Klasifikasi</span>
          <ul>
            {list_selected_layers.length > 0 &&
              list_selected_layers.map((layerInfo, index) => (
                <li key={index} className="ul-child m-2 pl-[10px] flex justify-between">
                  <Checkbox
                    label={Capitalize(layerInfo.title)}
                    name={layerInfo.layer}
                    checked={layerInfo.visible === true ? true : false}
                    onChange={(e) => updateSelectedClassLayer(e)}
                  />
                  <svg onClick={()=>zoomToExtent(layerInfo.extent)} className={`cursor-pointer ${layerInfo.visible ? 'opacity-100':'opacity-0' }`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10 14C10 14.5523 10.4477 15 11 15C11.5523 15 12 14.5523 12 14V12H14C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10H12V8C12 7.44772 11.5523 7 11 7C10.4477 7 10 7.44772 10 8V10H8C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12H10V14Z" fill="#000000"></path> </g></svg>
                </li>
              ))}
          </ul>
        </li>
        <li className="mt-2">
          <span className="font-[400] text-slate-950">RTRW</span>
          <ul>
            {list_layers.length > 0 &&
              list_layers
                .filter((lyr) => lyr.layer === "pola_ruang")
                .map((layerInfo, index) => (
                  <li key={index} className="ul-child m-2 pl-[10px]">
                    <Checkbox
                      label={layerInfo.title}
                      name={layerInfo.layer}
                      checked={layerInfo.visible === true ? true : false}
                      onChange={(e) => toggleVisibility(e)}
                    />
                    <div
                      className={`ml-6 transition-all duration-300 ease-in-out ${
                        layerInfo.visible === true ? "block" : "hidden"
                      }`}
                    >
                      <Legend src={layerInfo.layer} />
                    </div>
                  </li>
                ))}
          </ul>
        </li>
        <li className="mt-2">
          <span className="font-[400] text-slate-950">RDTR</span>
          <ul>
            {list_layers.length > 0 &&
              list_layers
                .filter((lyr) => lyr.layer === "rd_ar_pr")
                .map((layerInfo, index) => (
                  <li key={index} className="ul-child m-2 pl-[10px]">
                    <Checkbox
                      label={layerInfo.title}
                      name={layerInfo.layer}
                      checked={layerInfo.visible === true ? true : false}
                      onChange={(e) => toggleVisibility(e)}
                    />
                    <div
                      className={`ml-6 transition-all duration-300 ease-in-out ${
                        layerInfo.visible === true ? "block" : "hidden"
                      }`}
                    >
                      <Legend src={layerInfo.layer} />
                    </div>
                  </li>
                ))}
          </ul>
        </li>
        <li className="mt-2">
          <span className="font-[400] text-slate-950">Moratorium Gambut</span>
          <ul>
            {list_layers.length > 0 &&
              list_layers
                .filter((lyr) => lyr.layer === "gambut")
                .map((layerInfo, index) => (
                  <li key={index} className="ul-child m-2 pl-[10px]">
                    <Checkbox
                      label={layerInfo.title}
                      name={layerInfo.layer}
                      checked={layerInfo.visible === true ? true : false}
                      onChange={(e) => toggleVisibility(e)}
                    />
                    <div
                      className={`ml-6 transition-all duration-300 ease-in-out ${
                        layerInfo.visible === true ? "block" : "hidden"
                      }`}
                    >
                      <Legend src={layerInfo.layer} />
                    </div>
                  </li>
                ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default LeftPanel;
