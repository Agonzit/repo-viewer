import { Component, OnInit } from '@angular/core';
import { Commit } from '../models/commit.model';
import { DataService } from '../services/data-service.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  commits: Array<Commit>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private dataService: DataService) { 
    this.commits = [];
  }

  ngOnInit(): void {

    this.loadCommits();
  }

  loadCommits(): void{
   
    this.dataService.getCommits('agonzit', 'repo-viewer')
    .pipe(takeUntil(this.destroyed$))
    .subscribe(response => 
      {
        
        this.commits = response.map( (data: any) => {
          return new Commit({
            date: new Date(data.commit.committer.date),
            message: data.commit.message,
            author: data.commit.author.name});
        })
        .sort(function(a: any,b: any){
          return b.date.getTime() - a.date.getTime();
        });
        
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
