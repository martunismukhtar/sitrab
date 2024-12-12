import { useContext, useEffect } from "react";
import MapContext from "../context/MapContext";
import { Layers } from "../Services/layers.service";

import { useAtom } from "jotai";
import TileLayer from "ol/layer/Tile.js";
import {
  layersMapAtom,
  list_layersAtom,
  list_selectedClassAtom,
  setVisibleToast,
} from "../jotai/atoms";
import { Sumber } from "../Source/Index";

const DynamicTile = () => {
  const { peta } = useContext(MapContext);
  const [, setLayersMap] = useAtom(layersMapAtom);
  const [, setListLayer] = useAtom(list_layersAtom);
  const [, setSelectedLayer] = useAtom(list_selectedClassAtom);
  const [, setVisible] = useAtom(setVisibleToast);

  useEffect(() => {
    if (!peta) return;
    Layers((res) => {
      if (res.status == 200) {        
        res.data.layers.map((layer) => {
          if (
            layer.table === "kecamatan" ||
            layer.table === "jaringan_jalan" ||
            layer.table === "pola_ruang" ||
            layer.table === "rd_ar_pr" ||            
            layer.table === "gambut"
          ) {
            let tile_layer = new TileLayer({
              layerid: layer.table,
              name: layer.table,
              source: Sumber(layer.table),
            });
            peta.addLayer(tile_layer);
            setLayersMap((prev) => [...prev, tile_layer]);
            if (layer.table === "kecamatan") {
              tile_layer.setVisible(true);
              setListLayer((prev) => [
                ...prev,
                {
                  layer: layer.table,
                  title: layer.table_alias,
                  visible: true,
                },
              ]);
            } else {
              tile_layer.setVisible(false);
              setListLayer((prev) => [
                ...prev,
                {
                  layer: layer.table,
                  title: layer.table_alias,
                  visible: false,
                },
              ]);
            }            
          }
        });
        //klasifikasi
        res.data.klass.map((layer) => {                
          let tile_layer = new TileLayer({
            layerid: layer.table,
            name: layer.table,
            source: Sumber(layer.table),
          });
          setLayersMap((prev) => [...prev, tile_layer]);
          peta.addLayer(tile_layer);
          tile_layer.setVisible(false);          
          setSelectedLayer((prev) => [
            ...prev,
            {
              layer: layer.table,
              title: layer.table_alias,
              id: layer.id,
              extent:layer.extent,
              visible: false,
            },
          ]);
        });
      } else {
        setVisible({
          visible: true,
          message: res.message,
          type: "error",
        });
        return;
      }
    });
  }, [peta]);

  return null;
};

export default DynamicTile;
