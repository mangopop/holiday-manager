import { Injectable } from '@angular/core';
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';


@Injectable()
export class PublicHolService {

  private apiUrl = 'http://kayaposoft.com/enrico/json/v1.0/'

  constructor(private http: Http,private jsonp: Jsonp) { }


  private extractData(res: Response) {
    let body = res.json();
    return res.json().data || {};
  }

  private handleError() {

  }

  // this is returning a block of json?
  // getBankHolidayNonSecure(year): Observable<any> {
  //   let params = new URLSearchParams();
  //   // let year = new Date().getFullYear();
  //   params.set('callback', 'JSONP_CALLBACK');

  //   return this.jsonp.get(
  //     'http://kayaposoft.com/enrico/json/v1.0/?action=getPublicHolidaysForYear&year='+year+'&country=eng&jsonp=JSONP_CALLBACK')
  //     .map((res: Response) => {
  //       // return res.json().filter(data => data.id === 1) || {}; for extracting 1 user from list
  //       return res.json() || {};
  //     })
  //     // .startWith({ date: 'Loading...' })
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

    // this is returning a block of json?
  getBankHoliday(): Observable<any> {
    // let params = new URLSearchParams();
    // let year = new Date().getFullYear();
    // params.set('jsonp', 'JSONP_CALLBACK');

    return this.http.get(
      '/json/hols.json')
      .map((res: Response) => {
        console.log(res.json().filter(data => data.division === 'england-and-wales'));
        return res.json().filter(data => data.division === 'england-and-wales') || {};
        // return res.json() || {};
      })
      // .startWith({ date: 'Loading...' })
      .catch((error: any) => Observable.throw(error || 'Server error'));
      // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
