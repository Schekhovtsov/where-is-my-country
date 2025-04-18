import { Component, Input, OnInit, SimpleChange } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { getFocusStyles } from './map.config';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  @Input() search = '';
  @Input() zoomOnSearch = false;

  private map!: Map;
  private highlightedCountryLayer!: VectorLayer<VectorSource>;
  private allCountriesSource!: VectorSource;

  ngOnChanges({ search }: { search: SimpleChange }): void {
    const searchCurrentValue = search?.currentValue;

    if (!search.firstChange && search.previousValue !== search.currentValue) {
      this.search = searchCurrentValue;
      this.highlightCountry(searchCurrentValue);
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
    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
    ];

    this.map = new Map({
      target: 'map',
      layers: layers,
      controls: [],
      view: new View({
        center: fromLonLat([94, 66]),
        zoom: 3,
      }),
    });
  }

  private highlightCountry(countryName: string): void {
    if (countryName === '') {
      return;
    }

    countryName = countryName.toLowerCase();

    if (this.highlightedCountryLayer) {
      this.map.removeLayer(this.highlightedCountryLayer);
    }

    const countryFeature = this.allCountriesSource
      .getFeatures()
      .find(
        (f) =>
          f.get('NAME').toLowerCase() === countryName ||
          f.get('ISO_A2').toLowerCase() === countryName ||
          f.get('ISO_A3').toLowerCase() === countryName
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
      style: getFocusStyles(),
    });

    this.map.addLayer(this.highlightedCountryLayer);

    if (this.zoomOnSearch) {
      this.map.getView().fit(highlightSource.getExtent(), {
        padding: [150, 50, 50, 50],
        duration: 500,
      });
    }
  }
}
