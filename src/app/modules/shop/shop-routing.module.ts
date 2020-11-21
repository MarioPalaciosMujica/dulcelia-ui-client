import { AuthGuard } from './../../core/guards/auth.guard';
import { SystemPermission } from './../../shared/models/system-permission.enum';
import { WebpayFormComponent } from './webpay/webpay-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductLeftSidebarComponent } from './product/sidebar/product-left-sidebar/product-left-sidebar.component';
// import { ProductRightSidebarComponent } from './product/sidebar/product-right-sidebar/product-right-sidebar.component';
// import { ProductNoSidebarComponent } from './product/sidebar/product-no-sidebar/product-no-sidebar.component';
// import { ThreeColumnComponent } from './product/three-column/three-column.component';
// import { FourImageComponent } from './product/four-image/four-image.component';
// import { BundleProductComponent } from './product/bundle-product/bundle-product.component';
// import { ImageOutsideComponent } from './product/image-outside/image-outside.component';

import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';
// import { CollectionRightSidebarComponent } from './collection/collection-right-sidebar/collection-right-sidebar.component';
// import { CollectionNoSidebarComponent } from './collection/collection-no-sidebar/collection-no-sidebar.component';

import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './checkout/success/success.component';

// import { Resolver } from './../../shared/services/resolver.service';

const routes: Routes = [
  {
    path: 'producto/:idProduct', //'product/left/sidebar/:idProduct',
    component: ProductLeftSidebarComponent,
    // resolve: {
    //   data: Resolver
    // }
  },
  // {
  //   path: 'product/right/sidebar/:slug',
  //   component: ProductRightSidebarComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/no/sidebar/:slug',
  //   component: ProductNoSidebarComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/three/column/:slug',
  //   component: ThreeColumnComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/four/image/:slug',
  //   component: FourImageComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/bundle/:slug',
  //   component: BundleProductComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/image/outside/:slug',
  //   component: ImageOutsideComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'catalogo', //'collection/left/sidebar',
  //   component: CollectionLeftSidebarComponent
  // },
  // {
  //   path: 'catalogo/:idCategory', //'collection/left/sidebar',
  //   component: CollectionLeftSidebarComponent
  // },
  {
    path: 'catalogo/:catalogue', //'collection/left/sidebar',
    component: CollectionLeftSidebarComponent
  },
  {
    path: 'catalogo/:catalogue/:idCategory', //'collection/left/sidebar',
    component: CollectionLeftSidebarComponent
  },
  // {
  //   path: 'collection/right/sidebar',
  //   component: CollectionRightSidebarComponent
  // },
  // {
  //   path: 'collection/no/sidebar',
  //   component: CollectionNoSidebarComponent
  // },
  {
    path: 'carro', //'cart',
    component: CartComponent
  },
  {
    path: 'deseados', //'wishlist',
    component: WishlistComponent
  },
  {
    path: 'comparar', //'compare',
    component: CompareComponent
  },
  {
    path: 'pago', //'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { module: [SystemPermission.Checkout] }
  },
  {
    path: 'webpay/:id', 
    component: WebpayFormComponent
  },
  {
    path: 'pago/exito/:id', //'checkout/success/:id',
    component: SuccessComponent,
    canActivate: [AuthGuard],
    data: { module: [SystemPermission.Checkout] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
