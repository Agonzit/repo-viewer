import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  branchesNumber: number = 1;
  commitsNumber: number = 3;
  creationDate: string = '2021-01-05T06:26:21Z';
  lastCommit = {
    "date": '2021-01-05T06:26:21Z',
    "message": 'Create navbar and basic layout\n\nAdded a bootstrap navbar for navigation and basic routing layout. A Dashboard component with no real content was created as well, it will be loaded by default',
    "filesNumber": 6,
    "author": 'Alan Gonzalez'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
