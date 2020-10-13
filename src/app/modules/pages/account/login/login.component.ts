import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoginCorrect: boolean = null;

  constructor(
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

    console.log(loginModel); // DEBUG

    //this.authState.dispatch({type: AuthActionTypes.Login});
    //this.router.navigate(['/']);

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
