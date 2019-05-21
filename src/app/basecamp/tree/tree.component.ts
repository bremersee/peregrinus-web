import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../shared/model/node';
import {faFolder} from '@fortawesome/free-regular-svg-icons/faFolder';
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons/faFolderOpen';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {Branch} from '../../shared/model/branch';
import {BranchSettings} from '../../shared/model/branch-settings';
import {faMapMarker} from '@fortawesome/free-solid-svg-icons/faMapMarker';
import {faRoute} from '@fortawesome/free-solid-svg-icons/faRoute';
import {faShoePrints} from '@fortawesome/free-solid-svg-icons/faShoePrints';
import {TreeService} from '../../shared/service/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input('treeNodes')
  treeNodes: Node[];

  @Input()
  treeLevel = 0;

  @Input()
  treeTab = 1.5;

  faBars = faBars;
  faFolder = faFolder;
  faFolderOpen = faFolderOpen;
  faMapMarker = faMapMarker;
  faRoute = faRoute;
  faTrack = faShoePrints;

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
  }

  paddingLeft() {
    const value = 0.55 + (this.treeLevel * this.treeTab);
    return value + 'rem';
  }

  branchIcon(node: Node) {
    const settings = node.settings as BranchSettings;
    return settings.open ? this.faFolderOpen : this.faFolder;
  }

  switchOpenState(node: Node) {
    console.warn('Switch open state of branch' + node.id);
    const branch = node as Branch;
    const settings = node.settings as BranchSettings;
    if (settings.open) {
      this.closeBranch(branch);
    } else {
      this.openBranch(branch);
    }
  }

  closeBranch(branch: Branch) {
    this.treeService.closeBranch(branch)
    .subscribe(() => {
      const settings = branch.settings as BranchSettings;
      settings.open = false;
    });
  }

  openBranch(branch: Branch) {
    this.treeService.openBranch(branch)
    .subscribe(openBranch => {
      branch.children = openBranch.children;
      branch.settings = openBranch.settings;
    });
  }

}
