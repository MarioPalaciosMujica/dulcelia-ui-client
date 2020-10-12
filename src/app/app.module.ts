
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { ShopComponent } from './modules/shop/shop.component';
import { PagesComponent } from './modules/pages/pages.component';
import { ElementsComponent } from './modules/elements/elements.component';
import { IAuthState, initAuthState, rootReducer } from './core/reducers/auth.reducers';

import 'hammerjs';
import 'mousetrap';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    PagesComponent,
    ElementsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    SharedModule,
    AppRoutingModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    authState: NgRedux<IAuthState>
  ){
    console.log("AppModule Constructor")
    authState.configureStore(rootReducer, initAuthState);

    var state = authState.getState();
    console.log("authState.getState()");
    console.log(state);

  }
}
