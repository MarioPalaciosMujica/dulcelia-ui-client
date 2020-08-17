import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class ProductMockService {

    private _dataFile: string = "assets/data/products-mock.json";

    constructor(private http: HttpClient) {
    }

    public findAllActives(): Observable<any> {
        return this.http.get(this._dataFile);
    }
    
}