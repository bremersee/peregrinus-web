import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  treeNodes: TreeNode[];

  constructor() { }

  ngOnInit(): void {
    this.treeNodes = [{
      key: '0',
      label: 'Norwegen',
      icon: 'pi pi-fw pi-inbox',
      children: [{
        key: '1',
        label: 'Wpt1',
        icon: 'pi pi-fw pi-cog'
      }]
    }];
  }

}
