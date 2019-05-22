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
import {FeatureUtils} from '../../../shared/model/feature-utils';
import {NodeUtils} from '../../../shared/model/node-utils';

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
    if (NodeUtils.isBranch(this.node)) {
      this.nodeType = 'branch';
    } else if (NodeUtils.isFeatureLeaf(this.node)) {
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
    if (FeatureUtils.isRte(featureLeaf.feature)) {
      return faRoute;
    } else if (FeatureUtils.isTrk(featureLeaf.feature)) {
      return faShoePrints;
    } else if (FeatureUtils.isWpt(featureLeaf.feature)) {
      return faMapMarkerAlt;
    } else {
      return this.defaultIcon;
    }
  }

  featureIconStyle() {
    const settings = this.node.settings as FeatureLeafSettings;
    return settings.displayedOnMap ? 'darkgrey' : 'lightgrey';
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
