import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Repo } from '../models/repo.model';
import { Commit } from '../models/commit.model';

@Injectable()
export class DataService {

  private repopath = environment.API_URL + 'repos';
  private commitpath = 'commits/main';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  
  /*GET Repo and Commit data, handle simultaneously
  */
  getDashboardData(gituser: string = 'agonzit', reponame: string = 'repo-viewer'): Observable<any>{
    let repourl = this.repopath + '/' + gituser + '/' + reponame;
    let commiturl = repourl + '/' + this.commitpath;

    let requestRepo = this.http.get(repourl, this.httpOptions).pipe( catchError(this.handleError<any>('get Repo' )) );
    let requestCommit = this.http.get(commiturl, this.httpOptions).pipe( catchError(this.handleError<any>('get Last Commit' )) );

    return forkJoin([requestRepo, requestCommit]);
  }

  getCommits(gituser: string = 'agonzit', reponame: string = 'repo-viewer'): Observable<any>{
    let url = this.repopath + '/' + gituser + '/' + reponame + '/commits';
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any[]>('get Repo' ))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}