import { Component, OnDestroy, OnInit } from '@angular/core';
import { Repo } from '../models/repo.model';
import { Commit } from '../models/commit.model';
import { DataService } from '../services/data-service.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Values for the API call
  githubUser: string;
  reponame: string;

  repo: Repo = new Repo({});
  lastCommit: Commit;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private dataService: DataService) {
    // Initialize values
    this.githubUser = 'agonzit';
    this.reponame = 'repo-viewer';

    this.lastCommit = new Commit({
      date: '2021-01-05T06:26:21Z',
      message: 'Create navbar and basic layout\n\nAdded a bootstrap navbar for navigation and basic routing layout. A Dashboard component with no real content was created as well, it will be loaded by default',
      filesNumber: 6,
      author: 'Alan Gonzalez'});


   }

  ngOnInit(): void {

    this.getDashboardData();
  }

  /* Load data to display on dashboard
  */
  getDashboardData(): void{
    this.dataService.getDashboardData(this.githubUser, this.reponame)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(responses =>
      {
        /* Handle responses */
        const repores = responses[0]; // response for repo object
        const commitres = responses[1]; // response for lastcommit object

        // Asign Repo Values
        this.repo = new Repo({
            name: repores.name,
            author: repores.owner.login,
            description: repores.description,
            link: repores.html_url,
            creationdate: repores.created_at,
            updatedat: repores.updated_at,
            avatar: repores.owner.avatar_url});
        // Assign last commit values
        this.lastCommit = new Commit({
            date: commitres.commit.committer.date,
            message: commitres.commit.message,
            filesNumber: commitres.files.length,
            author: commitres.commit.author.name});

      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
