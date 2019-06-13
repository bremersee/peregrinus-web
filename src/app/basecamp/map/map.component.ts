import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Node} from '../../shared/model/node';
import {TreeService} from '../../shared/service/tree.service';
import {geoJSON, icon, latLng, LatLngBounds, Layer, Map as LeafletMap, marker, point, tileLayer} from 'leaflet';
import {NodeUtils} from '../../shared/model/node-utils';
import {Branch} from '../../shared/model/branch';
import {Feature, FeatureLeaf} from '../../shared/model/feature-leaf';
import {FeatureLeafSettings} from '../../shared/model/feature-leaf-settings';
import {RteSettings} from '../../shared/model/rte-settings';
import {RteProperties} from '../../shared/model/rte-properties';
import {TrkSettings} from '../../shared/model/trk-settings';
import {Subscription} from 'rxjs';
import {BasecampBusService} from '../../shared/service/basecamp-bus.service';
import {TrkProperties} from '../../shared/model/trk-properties';
import {WptProperties} from '../../shared/model/wpt-properties';
import {WptSettings} from '../../shared/model/wpt-settings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {

  private displayStateSubscription: Subscription;
  private displayOnMapSubscription: Subscription;

  @Input()
  initialized = false;

  @Input()
  treeNodes: Node[];

  osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: false,
    attribution: '© OpenStreetMap contributors'
  });

  map: LeafletMap;
  layers: Layer[] = [];
  center: latLng = latLng([52.3486833, 10.184336]);
  bounds: LatLngBounds = undefined;
  layersControl = {
    baseLayers: {
      'Street Maps': this.osm
    },
    overlays: {
      // 'Mt. Rainier Summit': this.summit,
      // 'Mt. Rainier Paradise Start': this.paradise,
      // 'Mt. Rainier Climb Route': this.route
    }
  };

  options = {
    layers: [this.osm],
    zoom: 12,
    center: this.center
  };

  constructor(private treeService: TreeService, private basecampBus: BasecampBusService) {
    this.displayStateSubscription = this.basecampBus.getDisplayOnMapState().subscribe(node => this.onNewDisplayState(node));
    this.displayOnMapSubscription = this.basecampBus.getDisplayOnMap().subscribe(node => this.onDisplayOnMap(node));
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.displayStateSubscription.unsubscribe();
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.init();
  }

  init(): void {
    if (this.initialized && this.map) {
      this.resetBounds();
      this.processNodes(this.treeNodes);
      this.fitMapToBounds();
    }
  }

  onLeafletClick(event): void {
    console.warn('Click map', event);
  }

  fitMapToBounds(): void {
    if (this.bounds) {
      this.center = this.bounds.getCenter();
      this.map.fitBounds(this.bounds, {
        padding: point(24, 24),
        maxZoom: 17,
        animate: true
      });
    }
  }

  onNewDisplayState(node: Node) {
    this.processNode(node);
  }

  onDisplayOnMap(node: Node) {
    this.resetBounds();
    this.processNode(node);
    this.fitMapToBounds();
  }

  private resetBounds(): void {
    this.bounds = undefined;
  }

  private extendBounds(layer: Layer): void {
    if (this.bounds) {
      this.bounds.extend(layer.getBounds());
    } else {
      this.bounds = layer.getBounds();
    }
  }

  private processNodes(nodes: Node[]): void {
    for (const node of nodes) {
      this.processNode(node);
    }
  }

  private processNode(node: Node): void {
    if (NodeUtils.isBranch(node)) {
      this.processBranch(node as Branch);
    } else if (NodeUtils.isFeatureLeaf(node)) {
      this.processFeatureLeaf(node as FeatureLeaf);
    }
  }

  private processBranch(branch: Branch): void {
    this.processNodes(branch.children);
  }

  private processFeatureLeaf(featureLeaf: FeatureLeaf): void {
    const featureLeafSettings = featureLeaf.settings as FeatureLeafSettings;
    if (featureLeafSettings.displayedOnMap) {
      if (featureLeaf._layer) {
        featureLeaf._layer.remove();
      }
      featureLeaf._layer = this.createLayer(featureLeaf);
      this.extendBounds(featureLeaf._layer);
      featureLeaf._layer.addTo(this.map);
    } else {
      if (featureLeaf._layer) {
        featureLeaf._layer.remove();
      }
      featureLeaf._layer = undefined;
    }
  }

  private createLayer(featureLeaf: FeatureLeaf): Layer {
    const feature = featureLeaf.feature;
    const properties = feature.properties;
    if ('Rte' === properties._type) {
      return this.createRte(feature, properties as RteProperties, feature.properties.settings as RteSettings);
    } else if ('Trk' === properties._type) {
      return this.createTrk(feature, properties as TrkProperties, feature.properties.settings as TrkSettings);
    } else if ('Wpt' === properties._type) {
      return this.createWpt(feature, properties as WptProperties, feature.properties.settings as WptSettings);
    }
    return geoJSON();
  }

  private createRte(feature: Feature, properties: RteProperties, settings: RteSettings): Layer {
    const rte = geoJSON(feature, {
      style: {
        color: settings.displayColor,
        weight: 3,
        opacity: 1.0
      }
    });
    for (const rteSeg of properties.rteSegments) {
      for (const rtePt of rteSeg.rtePts) {
        // rte.addData(rtePt.position);
        const wptIcon = icon({
          iconSize: [16, 16],
          iconAnchor: [8, 8],
          iconUrl: 'assets/circle_blue.svg'
        });
        const wpt = geoJSON(rtePt.position, {
          pointToLayer: (geoJsonPoint, latlng) => {
            return marker(latlng, {
              title: rtePt.name,
              icon: wptIcon
            });
          }
        });
        rte.addLayer(wpt);
        rte.bindPopup(layer => properties.name);
      }
    }
    return rte;
  }

  private createTrk(feature: Feature, properties: TrkProperties, settings: TrkSettings): Layer {
    return geoJSON(feature, {
      style: {
        color: settings.displayColor,
        weight: 3,
        opacity: 1.0
      }
    });
  }

  private createWpt(feature: Feature, properties: WptProperties, settings: WptSettings): Layer {
    const wptIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    });
    const wpt = geoJSON(feature, {
      pointToLayer: (geoJsonPoint, latlng) => {
        return marker(latlng, {
          title: properties.name,
          icon: wptIcon
        });
      }
    });
    wpt.bindPopup(layer => properties.markdownDescription);
    return wpt;
  }

}
