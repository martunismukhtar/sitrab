import React, { useContext } from 'react'
import RadioButton from '../../Elements/RadioButton/Index'
import MapContext from '../../../context/MapContext';

const DaftarPetaDasar = () => {
    const [baseLayer, setBaseLayer] = React.useState("google");
    const { peta } = useContext(MapContext);
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
  )
}

export default DaftarPetaDasar