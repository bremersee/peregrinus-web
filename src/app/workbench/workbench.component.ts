import { Component, OnInit } from '@angular/core';
import {TreeService} from '../shared/service/tree.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.treeService.loadBranches().subscribe((branches) => console.warn('Branches: ', branches));
  }

}
