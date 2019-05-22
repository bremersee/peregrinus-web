import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../shared/model/node';

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
  treeTabInitValue = 0.55;

  @Input()
  treeTabFactor = 1.5;

  @Input()
  treeTabUnit = 'rem';

  constructor() {
  }

  ngOnInit() {
  }

  paddingLeft() {
    const value = this.treeTabInitValue + (this.treeLevel * this.treeTabFactor);
    return value + this.treeTabUnit;
  }

}
