import React from "react";
import RadioButton from "../../Elements/RadioButton/Index";
import { layersMapAtom, list_layersAtom } from "../../../jotai/atoms";
import { useAtom } from "jotai";

const DaftarPetaDasar = () => {
  const [baseLayer, setBaseLayer] = React.useState("google");
  const [, setLayers] = useAtom(list_layersAtom);
  const [, setLayersMap] = useAtom(layersMapAtom);

  const handleChangeBaseLayer = (e) => {
    const { value } = e.target;
    setBaseLayer(value);

    setLayersMap((prevLayers) => {
      const updatedLayers = prevLayers.map((layerInfo) => {
        if (value === "osm") {
          if (layerInfo.get("layerid") === "google") {
            layerInfo.setVisible(!layerInfo.getVisible());
          }
        } else {
          if (layerInfo.get("layerid") === "osm") {
            layerInfo.setVisible(!layerInfo.getVisible());
          }
        }

        if (layerInfo.get("layerid") === value) {
          console.log(layerInfo);
          layerInfo.setVisible(!layerInfo.getVisible());
        }
        return layerInfo;
      });
      // return updatedLayers;
      return [...updatedLayers];
    });

    //update layers
    setLayers((prevLayers) => {
      const updatedLayers = prevLayers.map((layerInfo) => {
        if (value === "osm") {
          if (layerInfo.layer === "google") {
            layerInfo.visible = !layerInfo.visible;
          }
        } else {
          if (layerInfo.layer === "osm") {
            layerInfo.visible = !layerInfo.visible;
          }
        }
        if (layerInfo.layer === value) {
          layerInfo.visible = !layerInfo.visible;
        }
        return layerInfo;
      });
      return updatedLayers;
    });
  };
  return (
    <>
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
    </>
  );
};

export default DaftarPetaDasar;
