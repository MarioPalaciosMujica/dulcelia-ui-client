import { UserAccountModel } from '../../../../shared/models/user-account.model';
import { AuthenticationService } from './../../../../core/services/authenticantion.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAuthState } from './../../../../core/reducers/auth.reducers';
import { AuthActionTypes } from './../../../../core/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private userAccountmodel: UserAccountModel = null;
  public isLoginCorrect: boolean = null;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private authState: NgRedux<IAuthState>
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

    this.authState.dispatch({type: AuthActionTypes.Login});
    this.router.navigate(['/']);

    // this.authenticationService.login(loginModel).subscribe(data => {
    //   this.userAccountmodel = data as UserAccountModel;
    //   if(this.userAccountmodel){
    //     this.isLoginCorrect = true;
    //     this.authState.dispatch({type: AuthActionTypes.Login});
    //     this.router.navigate(['/']);
    //   }
    //   else{
    //     this.isLoginCorrect = false;
    //   }
    // });
  }

  get getEmail() { return this.loginForm.get('email'); }
  get getPassword() { return this.loginForm.get('password'); }

}
