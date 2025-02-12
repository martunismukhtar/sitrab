import { useContext, useEffect } from 'react'
import MapContext from '../context/MapContext'
import TileLayer from 'ol/layer/Tile'
import { useAtom } from 'jotai'
import { layersMapAtom } from '../jotai/atoms'
import PropTypes from "prop-types";
// import Layer from 'ol/layer/Layer'

LayarTile.propTypes = {
  source:PropTypes.object,
  layerID:PropTypes.string,
  isVisible:PropTypes.bool
}

const LayarTile = ({source, layerID, isVisible=true}) => {
  const { peta } = useContext(MapContext)
  const [, setLayersMap] = useAtom(layersMapAtom)

  useEffect(() => {
    if(!peta) return;
    let layer = new TileLayer({
      source: source,      
      layerid: layerID
    }) 
    peta.addLayer(layer)
    setLayersMap((prev) => [...prev, layer]);
    
    if(!isVisible) layer.setVisible(false) 
    else layer.setVisible(true)

  }, [peta, source, layerID, isVisible, setLayersMap])

  return null
}

export default LayarTile