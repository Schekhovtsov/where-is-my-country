import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import { defaults as defaultControls } from 'ol/control';
import ScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  private map!: Map;
  private highlightedCountryLayer!: VectorLayer<VectorSource>;
  private allCountriesSource!: VectorSource;

  async ngOnInit() {
    this.initMap();
    await this.loadAllCountries();
    this.highlightCountry('Italy');
  }

  private async loadAllCountries(): Promise<void> {
    const response = await fetch('./countries.geojson');
    const geoJsonData = await response.json();

    this.allCountriesSource = new VectorSource({
      features: new GeoJSON().readFeatures(geoJsonData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }),
    });
  }

  private initMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: defaultControls().extend([new ScaleLine()]),
      view: new View({
        center: fromLonLat([94, 66]), // Центр России
        zoom: 3,
      }),
    });
  }

  private highlightCountry(countryName: string): void {
    // Удаляем предыдущую подсветку
    if (this.highlightedCountryLayer) {
      this.map.removeLayer(this.highlightedCountryLayer);
    }

    // Находим нужную страну
    const countryFeature = this.allCountriesSource
      .getFeatures()
      .find(
        (f) =>
          f.get('NAME') === countryName ||
          f.get('ISO_A2') === countryName ||
          f.get('ISO_A3') === countryName
      );

    if (!countryFeature) {
      console.error(`Country ${countryName} not found`);
      return;
    }

    // Создаем слой для подсветки
    const highlightSource = new VectorSource({
      features: [countryFeature],
    });

    this.highlightedCountryLayer = new VectorLayer({
      source: highlightSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 0.8)',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.2)',
        }),
      }),
    });

    this.map.addLayer(this.highlightedCountryLayer);
    this.map.getView().fit(highlightSource.getExtent(), {
      padding: [50, 50, 50, 50],
      duration: 1000,
    });
  }
}
