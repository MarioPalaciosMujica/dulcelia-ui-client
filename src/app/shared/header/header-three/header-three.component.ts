import { NgRedux, select } from '@angular-redux/store';
import { IAuthState } from './../../../core/reducers/auth.reducers';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, Input, HostListener } from '@angular/core';

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

  @select(state => state.authToken) authToken;
  
  constructor(
    private authState: NgRedux<IAuthState>
  ) {
    // this.authState.subscribe( () => {
    //   var store = this.authState.getState();
    //   console.log(store);
    // });
  }

  ngOnInit(): void {
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
