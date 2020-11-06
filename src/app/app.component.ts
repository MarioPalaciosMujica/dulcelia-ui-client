import { Component, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AuthActionTypes } from 'src/app/core/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, 
    translate: TranslateService,
    private store: Store<any>,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('es');
      // translate.addLangs(['en', 'es', 'fr']);
      translate.addLangs(['es']);
    }
    
    // this.store.subscribe(state => {
    //   if(localStorage.getItem('authData') != null && !state.authReducer.loaded){
    //     let authModel: any = JSON.parse(localStorage.getItem('authData'));
    //     this.store.dispatch({ type: AuthActionTypes.Load });
    //     this.store.dispatch({ type: AuthActionTypes.Login, payload: authModel });
    //   }
    // });
  }

}
