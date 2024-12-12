import { TileWMS } from "ol/source";

export const Sumber =(layer) => new TileWMS({
    url: 'http://pupracehbarat.id:8080/geoserver/sitrab/wms',
    params: {
        'LAYERS': `sitrab:${layer}`,
        TRANSPARENT: "true",
		FORMAT: "image/png",
		TILED: true,
    },
    serverType: 'geoserver',
    transition: 0,
    crossOrigin: 'anonymous',
    projection: 'EPSG:3857',
});