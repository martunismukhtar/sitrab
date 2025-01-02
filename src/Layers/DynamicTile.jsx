import { useContext, useEffect } from "react";
import MapContext from "../context/MapContext";
import { Layers } from "../Services/layers.service";

import { useAtom } from "jotai";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import TileImage from "ol/source/TileImage";
import {
  layersMapAtom,
  list_layersAtom,
  list_selectedClassAtom,
  setVisibleToast,
} from "../jotai/atoms";
import { Sumber } from "../Source/Index";
import { LayersSource } from "../Source/LayersSource";

const DynamicTile = () => {
  const { peta } = useContext(MapContext);
  const [, setLayersMap] = useAtom(layersMapAtom);
  const [, setListLayer] = useAtom(list_layersAtom);
  const [, setSelectedLayer] = useAtom(list_selectedClassAtom);
  const [, setVisible] = useAtom(setVisibleToast);

  useEffect(() => {
    if (!peta) return;

    //osm
    let osm_tile_layer = new TileLayer({
      layerid: "osm",
      name: "osm",
      source: new OSM(),
    });
    peta.addLayer(osm_tile_layer);
    setLayersMap((prev) => [...prev, osm_tile_layer]);
    osm_tile_layer.setVisible(false);
    setListLayer((prev) => [
      ...prev,
      {
        layer: "osm",
        title: "OSM",
        visible: false,
      },
    ]);

    //google
    let google_tile_layer = new TileLayer({
      source: new TileImage({
        url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga",
        crossOrigin: "anonymous",
      }),
      layerid: "google",
      visible: true,
    });
    peta.addLayer(google_tile_layer);
    setLayersMap((prev) => [...prev, google_tile_layer]);
    google_tile_layer.setVisible(true);
    setListLayer((prev) => [
      ...prev,
      {
        layer: "google",
        title: "Google",
        visible: true,
      },
    ]);

    LayersSource.map((layer) => {
      let tile_layer = new TileLayer({
        layerid: layer.table,
        name: layer.table,
        source: Sumber(layer.table),
      });
      peta.addLayer(tile_layer);      
      if (layer.visible) tile_layer.setVisible(true);
      else tile_layer.setVisible(false);
      setLayersMap((prev) => [...prev, tile_layer]);

      setListLayer((prev) => [
        ...prev,
        {
          layer: layer.table,
          title: layer.table_alias,
          visible: layer.visible,
        },
      ]);
    });

    Layers((res) => {
      if (res.status == 200) {
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
              extent: layer.extent,
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
