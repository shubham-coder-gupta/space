import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiBase = 'https://api.spaceXdata.com/v3/launches?limit=100';

  constructor(private http: HttpClient) {}

  getListing(param?) {
    let params = new HttpParams();
if(param){    
params = params.append(param.key, param.value);
}
    return this.http.get(`${this.apiBase}`,{params:param});
  }

}
