import { Fill, Stroke, Style } from 'ol/style';

export const getFocusStyles = () =>
  new Style({
    stroke: new Stroke({
      color: 'rgba(255, 0, 0, 0.25)',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.2)',
    }),
  });

export const getVectorLayerCountryStyle = () =>
  new Style({
    stroke: new Stroke({
      color: 'rgba(255, 0, 0, 0.25)',
      width: 1,
    }),
  });
