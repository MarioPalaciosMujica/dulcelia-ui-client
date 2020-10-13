import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';
import { stringify } from '@angular/compiler/src/util';

export class CustomValidators {

    constructor(
        private authService: AuthService
    ){}

    static uniqueEmail(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise( (resolve, reject) => {
            // this.authService.isUniqueEmail(String(control.value).trim()).subscribe(data => {
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