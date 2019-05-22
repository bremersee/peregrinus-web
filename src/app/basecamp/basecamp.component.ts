import {Component, OnInit} from '@angular/core';
import {icon, latLng, Map, marker, point, polyline, tileLayer, geoJSON, Layer, latLngBounds, LatLngBounds} from 'leaflet';
import {TreeService} from '../shared/service/tree.service';
import {Node} from '../shared/model/node';
import {Branch} from '../shared/model/branch';
import {Feature} from '../shared/model/feature';
import {FeatureLeaf} from '../shared/model/feature-leaf';
import {BranchSettings} from '../shared/model/branch-settings';
import {FeatureSettings, RteSettings} from '../shared/model/rte-settings';
import {TrkSettings} from '../shared/model/trk-settings';
import {FeatureLeafSettings} from '../shared/model/feature-leaf-settings';
import {RteProperties} from '../shared/model/rte-properties';
import {NodeUtils} from '../shared/model/node-utils';

@Component({
  selector: 'app-basecamp',
  templateUrl: './basecamp.component.html',
  styleUrls: ['./basecamp.component.css']
})
export class BasecampComponent implements OnInit {
  map: Map;
  branches: Branch[] = [];
  layers: Layer[] = [];
  center: latLng = latLng([52.3486833, 10.184336]);
  bbox: LatLngBounds;

  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: false,
    attribution: '© OpenStreetMap contributors'
  });

  /*
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });

  summit = marker([46.8523, -121.7603], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  paradise = marker([46.78465227596462, -121.74141269177198], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });


  geoJson = geoJSON();
   */

  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps
    },
    overlays: {
      // 'Mt. Rainier Summit': this.summit,
      // 'Mt. Rainier Paradise Start': this.paradise,
      // 'Mt. Rainier Climb Route': this.route
    }
  };

  options = {
    layers: [this.streetMaps],
    zoom: 7
  };

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.map = map;
    /*
    this.map.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });
    */
    this.treeService
    .loadBranches()
    .subscribe(branches => this.processBranches(branches));
  }

  private extendBounds(layer: Layer) {
    if (this.bbox) {
      const layerBounds = layer.getBounds();
      console.warn('bbox ', this.bbox);
      console.warn('layer', layerBounds);
      this.bbox.extend(layer.getBounds());
    } else {
      this.bbox = layer.getBounds();
    }
  }

  private processBranches(branches: Branch[]): void {
    this.branches = branches;
    for (const branch of this.branches) {
      this.processNode(branch);
    }
    this.map.fitBounds(this.bbox, {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });
  }

  private processNodes(nodes: Node[]): void {
    if (nodes) {
      for (const node of nodes) {
        this.processNode(node);
      }
    }
  }

  private processNode(node: Node): void {
    if (NodeUtils.isBranch(node)) {
      const branch = node as Branch;
      this.processNodes(branch.children);
    } else if (NodeUtils.isFeatureLeaf(node)) {
      const featureLeaf = node as FeatureLeaf;
      if (featureLeaf.feature) {
        const featureLeafSettings = featureLeaf.settings as FeatureLeafSettings;
        if (featureLeafSettings.displayedOnMap) {
          const feature = featureLeaf.feature;
          const properties = feature.properties;
          if ('Rte' === properties._type) {
            const settings = properties.settings as RteSettings;
            const rteProperties = properties as RteProperties;
            const rte = geoJSON(feature, {
              style: {
                color: settings.displayColor,
                weight: 3,
                opacity: 1.0
              }
            });
            for (const rteSeg of rteProperties.rteSegments) {
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
                // this.layers.push(wpt);
                // wpt.addTo(this.map);
              }
            }
            this.layers.push(rte);
            this.extendBounds(rte);
          } else if ('Trk' === properties._type) {
            const settings = properties.settings as TrkSettings;
            const trk = geoJSON(feature, {
              style: {
                color: settings.displayColor,
                weight: 3,
                opacity: 1.0
              }
            });
            this.layers.push(trk);
            this.extendBounds(trk);
            // trk.addTo(this.map);
          } else if ('Wpt' === properties._type) {
            console.warn('Wpt');
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
            this.layers.push(wpt);
            this.extendBounds(wpt);
            // wpt.addTo(this.map);
            wpt.feature = feature;
            console.warn('===> feature', wpt.feature);
          }
        }
      }
    }
  }

  private display(branches: Branch[]): void {
    this.branches = branches;
    const list = new Array<Feature>();
    for (const branch of this.branches) {
      this.findFeatures(branch, list);
    }
    const featureCollection = {
      type: 'FeatureCollection',
      features: list
    };
    // this.geoJson.addData(featureCollection);
  }

  private findFeatures(branch: Branch, features: Feature[]): void  {
    for (const child of branch.children) {
      if ('branch' === child._type) {
        this.findFeatures(child as Branch, features);
      } else if ('feature-leaf' === child._type) {
        const featureLeaf = child as FeatureLeaf;
        const feature = featureLeaf.feature;
        features.push(feature);
      }
    }
  }

}
