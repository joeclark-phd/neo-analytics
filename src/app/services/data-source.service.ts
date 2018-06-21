import { Injectable } from '@angular/core';
import { Order } from "../backorders/order";
import {Observable} from "rxjs/index";
import { of } from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http:HttpClient) { }

  getBackorders(): Observable<any> {
    return this.http.get('assets/backorders-mock.json');
  }
}
