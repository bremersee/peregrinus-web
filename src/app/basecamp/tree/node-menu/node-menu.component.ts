import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../../shared/model/node';
import {NodeUtils} from '../../../shared/model/node-utils';
import {Branch} from '../../../shared/model/branch';
import {FeatureLeaf} from '../../../shared/model/feature-leaf';
import {FeatureLeafSettings} from '../../../shared/model/feature-leaf-settings';
import {TreeService} from '../../../shared/service/tree.service';
import {BasecampBusService} from '../../../shared/service/basecamp-bus.service';

@Component({
  selector: 'app-node-menu',
  templateUrl: './node-menu.component.html',
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit {

  @Input()
  node: Node;

  nodeType: string;

  constructor(private treeService: TreeService, private basecampBus: BasecampBusService) { }

  ngOnInit() {
    this.nodeType = null;
    if (NodeUtils.isBranch(this.node)) {
      this.nodeType = 'branch';
    } else if (NodeUtils.isFeatureLeaf(this.node)) {
      this.nodeType = 'feature';
    }
    if (this.nodeType == null) {
      this.nodeType = 'unknown';
    }
  }

  displayAllOnMap() {
    const branch = this.node as Branch;
    console.warn('display all on map of', branch.name);
  }

  removeAllFromMap() {
    const branch = this.node as Branch;
    console.warn('remove all from map of', branch.name);
  }

  displayOnMap() {
    const settings = this.node.settings as FeatureLeafSettings;
    const newDisplayedOnMapValue = true;
    this.treeService.displayNodeOnMap(this.node, newDisplayedOnMapValue)
    .subscribe(() => {
      settings.displayedOnMap = newDisplayedOnMapValue;
      this.basecampBus.sendDisplayOnMap(this.node);
    });
  }

}
