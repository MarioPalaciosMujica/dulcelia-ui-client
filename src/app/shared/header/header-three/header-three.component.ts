import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActionTypes } from 'src/app/core/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {

  @Input() class: string = 'header-2';
  // @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() themeLogo: string = 'assets/images/icon/logo_dulcelia_md.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;
  authStateModel: any; //AuthModel; //Observable<AuthModel>;

  constructor(
    private store: Store<any>,
    private router: Router,
  ) { 
    this.store.subscribe(state => {
      this.authStateModel = state.authReducer.authModel;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch({ type: AuthActionTypes.Logout });
    localStorage.setItem('authData', null);
    this.router.navigate(['/']);
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 300 && window.innerWidth > 400) { 
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

}
