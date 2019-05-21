import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../../shared/model/node';
import {Branch} from '../../../shared/model/branch';
import {BranchSettings} from '../../../shared/model/branch-settings';
import {TreeService} from '../../../shared/service/tree.service';
import {faFolder} from '@fortawesome/free-regular-svg-icons/faFolder';
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons/faFolderOpen';
import {faRoute} from '@fortawesome/free-solid-svg-icons/faRoute';
import {faShoePrints} from '@fortawesome/free-solid-svg-icons/faShoePrints';
import {FeatureLeafSettings} from '../../../shared/model/feature-leaf-settings';
import {faQuestion} from '@fortawesome/free-solid-svg-icons/faQuestion';
import {FeatureLeaf} from '../../../shared/model/feature-leaf';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-node-icon',
  templateUrl: './node-icon.component.html',
  styleUrls: ['./node-icon.component.css']
})
export class NodeIconComponent implements OnInit {

  @Input()
  node: Node;

  nodeType: string;

  defaultIcon = faQuestion;

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    this.nodeType = null;
    const nt = this.node._type;
    if ('branch' === nt) {
      this.nodeType = 'branch';
    } else if ('feature-leaf' === nt) {
      this.nodeType = 'feature';
    }
    if (this.nodeType == null) {
      this.nodeType = 'unknown';
    }
  }

  branchIcon() {
    const settings = this.node.settings as BranchSettings;
    return settings.open ? faFolderOpen : faFolder;
  }

  featureIcon() {
    const featureLeaf = this.node as FeatureLeaf;
    const featureType = featureLeaf.feature.properties._type;
    if ('Rte' === featureType) {
      return faRoute;
    } else if ('Trk' === featureType) {
      return faShoePrints;
    } else if ('Wpt' === featureType) {
      return faMapMarkerAlt;
    } else {
      return this.defaultIcon;
    }
  }

  featureIconStyle() {
    const settings = this.node.settings as FeatureLeafSettings;
    return settings.displayedOnMap ? 'darkgrey' : 'lightgrey';
  }

  featureDisplayedOnMap() {
    const settings = this.node.settings as FeatureLeafSettings;
    return settings.displayedOnMap;
  }

  switchOpenState() {
    const branch = this.node as Branch;
    const settings = this.node.settings as BranchSettings;
    if (settings.open) {
      this.closeBranch(branch);
    } else {
      this.openBranch(branch);
    }
  }

  switchDisplayedOnMapState() {
    const settings = this.node.settings as FeatureLeafSettings;
    const newDisplayedOnMapValue = !settings.displayedOnMap;
    this.treeService.displayNodeOnMap(this.node, newDisplayedOnMapValue)
    .subscribe(() => {
      settings.displayedOnMap = newDisplayedOnMapValue;
    });
  }

  private closeBranch(branch: Branch) {
    this.treeService.closeBranch(branch)
    .subscribe(() => {
      const settings = branch.settings as BranchSettings;
      settings.open = false;
    });
  }

  private openBranch(branch: Branch) {
    this.treeService.openBranch(branch)
    .subscribe(openBranch => {
      branch.children = openBranch.children;
      branch.settings = openBranch.settings;
    });
  }

}
