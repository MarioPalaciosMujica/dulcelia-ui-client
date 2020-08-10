import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './modules/shop/shop.component';
import { PagesComponent } from './modules/pages/pages.component';
import { ElementsComponent } from './modules/elements/elements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio/dulcelia', //'home/dulcelia',
    pathMatch: 'full'
  },
  {
    path: 'inicio', //'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'tienda', //'shop',
    component: ShopComponent,
    loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
  },
  { 
    path: 'pagina',
    component: PagesComponent,
    loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) 
  },
  // { 
  //   path: 'elements', 
  //   component: ElementsComponent,
  //   loadChildren: () => import('./modules/elements/elements.module').then(m => m.ElementsModule) 
  // },
  {
    path: '**', // Navigate to Home Page if not found any page
    redirectTo: 'inicio/dulcelia', //'home/dulcelia',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
