import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../core/services/authenticantion.service';
import { CustomValidators } from './../../../../shared/pipes/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
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
        Validators.pattern('/([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/gm')
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
        Validators.pattern('/^[a-zA-Z\s0-9]+$/')
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
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let customerAccountModel = {
      firstName: this.getFirstName.value,
      lastName: this.getLastName.value,
      email: this.getEmail.value,
      phone: this.getPhone.value,
      commune: this.getCommune.value,
      address: this.getAddress.value,
      password: this.getPassword.value
    }
    this.authenticationService.register(customerAccountModel).subscribe();
    this.router.navigate(['/']);
  }

  get getFirstName(){ return this.registerForm.get('firstname'); }
  get getLastName(){ return this.registerForm.get('lastname'); }
  get getEmail(){ return this.registerForm.get('email'); }
  get getPhone(){ return this.registerForm.get('phone'); }
  get getCommune(){ return this.registerForm.get('commune'); }
  get getAddress(){ return this.registerForm.get('address'); }
  get getPassword(){ return this.registerForm.get('password'); }
  get getPasswordConfirm(){ return this.registerForm.get('passwordConfirm'); }
}
