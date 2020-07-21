import { AppError, NotFoundError, BadInputError } from './../../shared/models/error.model';
// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';

// @Injectable({
//   providedIn: 'root'
// })
export class BaseService {

    constructor(
      protected endpoint: string, 
      protected http: HttpClient
    ) { }
  
    save(resource: any){
      return this.http.post(this.endpoint + '/save', resource)
        .map(response => response)
        .catch(this.handleError);
    }
  
    findAll(){
      return this.http.get(this.endpoint + '/findAll')
        .map(response => response)
        .catch(this.handleError)
    }
  
    findById(id: number){
      return this.http.get(this.endpoint + '/findById/' + id)
        .map(response => response)
        .catch(this.handleError)
    }
  
    update(resource: any){
      return this.http.patch(this.endpoint + '/update', resource)
        .map(response => response)
        .catch(this.handleError);
    }
  
    updateActive(id: number){
      return this.http.get(this.endpoint + '/updateActive/' + id)
        .map(response => response)
        .catch(this.handleError);
    }
    
    deleteById(id: number){
      return this.http.delete(this.endpoint + '/deleteById/' + id)
        .map(response => response)
        .catch(this.handleError);
    }
  
    protected handleError(error: Response){
      if(error.status === 400){
          return throwError(new BadInputError(error));
      }
      else if(error.status === 404){
          return throwError(new NotFoundError(error));
      }
      else{
          return throwError(new AppError(error));
      }
    }
    
}