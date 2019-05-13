import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../shared/model/node';
import {faFolder} from '@fortawesome/free-regular-svg-icons/faFolder';
import {faFolderOpen} from '@fortawesome/free-regular-svg-icons/faFolderOpen';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input('branches')
  treeNodes: Node[];

  faBars = faBars;
  faFolder = faFolder;
  faFolderOpen = faFolderOpen;

  constructor() {
  }

  ngOnInit() {
  }

  openNode(node: Node): void {
    console.warn('Open node ' + node.id);
  }

  closeNode(node: Node): void {
    console.warn('Close node ' + node.id);
  }

}
