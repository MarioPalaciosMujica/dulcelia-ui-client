import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService {

  constructor(http: HttpClient) { 
    super(environment.apiProductImage, http);
  }

  uploadImage(resource: any){
    return this.http.post(this.endpoint + '/uploadImage', resource)
      .map(response => response)
      .catch(this.handleError);
  }
}
