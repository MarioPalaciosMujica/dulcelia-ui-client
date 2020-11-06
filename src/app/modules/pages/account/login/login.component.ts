import { AuthModel } from './../../../../shared/models/auth.model';
import { Login } from './../../../../core/actions/auth.actions';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActionTypes } from 'src/app/core/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoginCorrect: boolean = null;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { 
    this.loginForm = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let loginModel = { 
      username: this.getEmail.value,
      password: this.getPassword.value
    };

    this.authService.login(loginModel).subscribe(data => {
      let authModel: AuthModel = data as AuthModel;
      if(authModel){
        this.isLoginCorrect = true;
        localStorage.setItem('authData', JSON.stringify(authModel));
        this.store.dispatch({ type: AuthActionTypes.Load });
        this.store.dispatch({ type: AuthActionTypes.Login, payload: authModel });
        this.router.navigate(['/']);
      }
      else {
        this.isLoginCorrect = false;
      }
    });
  }
  
  get getEmail() { return this.loginForm.get('email'); }
  get getPassword() { return this.loginForm.get('password'); }

}
