import { AuthenticationService } from './../../core/services/authenticantion.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

export class CustomValidators {

    constructor(
        private authenticationService: AuthenticationService
    ){}

    static uniqueEmail(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise( (resolve, reject) => {
            // this.authenticationService.isUniqueEmail(String(control.value).trim()).subscribe(data => {
            //     if(data as boolean){
            //         resolve(null);
            //     }
            //     else {
            //         resolve({ uniqueEmail: false });
            //     }
            // });

            setTimeout( () =>{
                if(String(control.value).trim() === 'email@email.com'){
                    resolve({ uniqueEmail: true });
                }
                else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    static passwordConfirmation(password: string): ValidatorFn {
        return (confirmation: AbstractControl): ValidationErrors | null => {
            if(confirmation.value != password) {
                return { passwordConfirmation: true };
            }
            else {
                return null;
            }
        }
    }
}