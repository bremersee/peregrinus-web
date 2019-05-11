import {Component, OnInit} from '@angular/core';
import {TreeService} from '../shared/service/tree.service';
import {Branch} from '../shared/model/branch';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {
  branches: Branch[];

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    this.treeService
    .loadBranches()
    .subscribe(branches => this.branches = branches);
  }

}
