import { Component, Input, OnInit } from '@angular/core';
import { Commit } from 'src/app/models/commit.model';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {

 /* @Input() public title: string | '' = '';
  @Input() public subtitle: string | ''= '';
  @Input() public body: string | '' = '';
*/
  @Input() public data: Commit;

  constructor() { this.data = new Commit({}); }

  ngOnInit(): void {
  }

}
