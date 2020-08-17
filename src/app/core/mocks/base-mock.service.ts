import { AppError, NotFoundError, BadInputError } from './../../shared/models/error.model';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class BaseMockService {
    constructor(
        //protected endpoint: string, 
        protected http: HttpClient
    ) { }

    // findAll(){
    //     return this.http.get(this.endpoint)
    //       .map(response => response)
    //       .catch(this.handleError)
    // }

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