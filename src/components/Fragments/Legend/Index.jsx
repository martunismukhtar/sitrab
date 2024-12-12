const Legend = ({src}) => {
  return (
    <img src={`http://pupracehbarat.id:8080/geoserver/sitrab/wms?REQUEST=GetLegendGraphic&sld_version=1.0.0&layer=sitrab:${src}&format=image/png&LEGEND_OPTIONS=forceRule:True;forceLabels:on;dx:0.2;dy:0.2;mx:0.2;my:0.2;fontStyle:normal;borderColor:0000ff;border:true;fontColor:#565555;fontSize:12`} alt='legend' />
  )
}

export default Legend