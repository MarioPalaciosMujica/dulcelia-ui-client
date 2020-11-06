import { UserContactModel } from './../../../../shared/models/user-contact.model';
import { UserAccountModel } from './../../../../shared/models/user-account.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../../core/services/auth.service';
import { environment } from './../../../../../environments/environment';
import { AuthModel } from 'src/app/shared/models/auth.model';
import { Store } from '@ngrx/store';
import { AuthActionTypes } from 'src/app/core/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  filePdf = environment.fileTermsAndConditions;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.registerForm = this.fb.group({
      firstname: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      lastname: [null, [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'), 
      ]],
      email: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.email
        // ,CustomValidators.uniqueEmail
      ]],
      phone: [null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20),
        Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')
      ]],
      commune: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      address: [null, [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')
      ]],
      password: [null, [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(20)
      ]],
      passwordConfirm: [null, [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(20)
        // ,CustomValidators.passwordConfirmation(null)
      ]]
      ,acceptTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let userContact: UserContactModel = {
      idUserContact: null,
      phoneNumber: this.getPhone.value,
      commune: this.getCommune.value,
      address: this.getAddress.value
    }
    let userAccountModel: UserAccountModel = {
      username: null,
      password: this.getPassword.value,
      email: this.getEmail.value,
      firstName: this.getFirstName.value,
      lastName: this.getLastName.value,
      userContact: userContact,
      role: null
    }
    console.log(userAccountModel); // DEBUG

    this.authService.register(userAccountModel).subscribe(data => {
      let authModel: AuthModel = data as AuthModel;
      localStorage.setItem('authData', JSON.stringify(authModel));
      this.store.dispatch({ type: AuthActionTypes.Load });
      this.store.dispatch({ type: AuthActionTypes.Register, payload: authModel });
      this.router.navigate(['/']);
    });
  }

  get getFirstName(){ return this.registerForm.get('firstname'); }
  get getLastName(){ return this.registerForm.get('lastname'); }
  get getEmail(){ return this.registerForm.get('email'); }
  get getPhone(){ return this.registerForm.get('phone'); }
  get getCommune(){ return this.registerForm.get('commune'); }
  get getAddress(){ return this.registerForm.get('address'); }
  get getPassword(){ return this.registerForm.get('password'); }
  get getPasswordConfirm(){ return this.registerForm.get('passwordConfirm'); }
  get getAcceptTerms(){ return this.registerForm.get('acceptTerms'); }

}
