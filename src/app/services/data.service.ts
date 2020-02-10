import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private handleError(error: Response) {
    if (error.status === 404) {
      return throwError( new NotFoundError() );
    }
    if (error.status === 400) {
      return Observable.throw(new BadInput(error));
    }
    return throwError( new AppError(error));
  }

  constructor(protected url: string, protected http: HttpClient ) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  create(resource) {
    return Observable.throw(new AppError())
    // return this.http.post(this.url, JSON.stringify(resource)).pipe(
    //   map(response => response),
    //   catchError(this.handleError)
    // );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true})).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  delete( id: any ) {
    return Observable.throw(new AppError());
    // return this.http.delete( this.url + '/' + id).pipe(
    //   map(response => response),
    //   catchError(this.handleError)
    // );
  }

}
