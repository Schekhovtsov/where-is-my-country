import { Component, Input, OnInit, SimpleChange } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import { Zoom } from 'ol/control';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  @Input() search = '';

  private map!: Map;
  private highlightedCountryLayer!: VectorLayer<VectorSource>;
  private allCountriesSource!: VectorSource;

  ngOnChanges({ search }: { search: SimpleChange }): void {
    const currentValue = search?.currentValue;

    if (!search.firstChange && search.previousValue !== search.currentValue) {
      this.search = currentValue;
      this.highlightCountry(currentValue);
    }
  }

  async ngOnInit() {
    this.initMap();
    await this.loadAllCountries();
    this.highlightCountry(this.search);
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
      controls: [],
      view: new View({
        center: fromLonLat([94, 66]), // Центр России
        zoom: 3,
      }),
    });
  }

  private highlightCountry(countryName: string): void {
    if (countryName === '') {
      return;
    }

    if (this.highlightedCountryLayer) {
      this.map.removeLayer(this.highlightedCountryLayer);
    }

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

    const highlightSource = new VectorSource({
      features: [countryFeature],
    });

    this.highlightedCountryLayer = new VectorLayer({
      source: highlightSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 0.25)',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.2)',
        }),
      }),
    });

    this.map.addLayer(this.highlightedCountryLayer);
    this.map.getView().fit(highlightSource.getExtent(), {
      padding: [150, 50, 50, 50],
      duration: 500,
    });
  }
}
