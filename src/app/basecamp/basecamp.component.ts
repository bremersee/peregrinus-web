import {Component, OnInit} from '@angular/core';
import {TreeService} from '../shared/service/tree.service';
import {Branch} from '../shared/model/branch';

@Component({
  selector: 'app-basecamp',
  templateUrl: './basecamp.component.html',
  styleUrls: ['./basecamp.component.css']
})
export class BasecampComponent implements OnInit {

  initialized = false;

  branches: Branch[] = [];

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    this.treeService
    .loadBranches()
    .subscribe(branches => {
      this.branches = branches;
      this.initialized = true;
    });
  }

}
