import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class TagMockService {

    private _dataFile: string = "assets/data/tags-mock.json";

    constructor(private http: HttpClient) {
    }

    public findAll(): Observable<any> {
        return this.http.get(this._dataFile);
    }
    
}