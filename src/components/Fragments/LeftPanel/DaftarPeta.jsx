import Legend from "../Legend/Index";
import Checkbox from "../../Elements/Checkbox/Index";
import { layersMapAtom, list_layersAtom } from "../../../jotai/atoms";
import { useAtom } from "jotai";

const DaftarPeta = (props) => {
  const { judul, layer } = props;
  const [list_layers, setLayers] = useAtom(list_layersAtom);
  const [, setLayersMap] = useAtom(layersMapAtom);

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
  return (
    <li className="mt-2">
      <span className="font-[400] text-slate-950">{judul}</span>
      <ul>
        {list_layers.length > 0 &&
          list_layers
            .filter((lyr) => lyr.layer === layer)
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
  );
};

export default DaftarPeta;
