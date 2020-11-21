// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  stripe_token: 'STRIPE_PUBLISHABLE_KEY',
  paypal_token: 'PAYPAL_CLIENT_ID',

  fileTermsAndConditions: 'assets/files/terminos_condiciones_20201020.pdf',

  // DEV
  apiProductBrand: 'http://localhost:8080/Brand',
  apiProductCatalogue: 'http://localhost:8080/Catalogue',
  apiProductCategory: 'http://localhost:8080/Category',
  apiProductCollection: 'http://localhost:8080/Collection',
  apiProductImage: 'http://localhost:8080/Image',
  apiProductMaterial: 'http://localhost:8080/Material',
  apiProductOption: 'http://localhost:8080/Option',
  apiProductProduct: 'http://localhost:8080/Product',
  apiProductTag: 'http://localhost:8080/Tag',
  apiProductVariant: 'http://localhost:8080/Variant',

  apiOrderCoupon: 'http://localhost:8081/Coupon',
  apiOrderPurchaseOrder: 'http://localhost:8081/PurchaseOrder',
  apiOrderPurchaseOrderStatus: 'http://localhost:8081/PurchaseOrderStatus',

  apiWebpayClient: 'http://localhost:8090/WebpayPlus',

  apiAuthUserAccount: 'http://localhost:8082/UserAccount'

  // QA
  // apiProductBrand: 'http://54.94.70.82:8080/Brand',
  // apiProductCatalogue: 'http://54.94.70.82:8080/Catalogue',
  // apiProductCategory: 'http://54.94.70.82:8080/Category',
  // apiProductCollection: 'http://54.94.70.82:8080/Collection',
  // apiProductImage: 'http://54.94.70.82:8080/Image',
  // apiProductMaterial: 'http://54.94.70.82:8080/Material',
  // apiProductOption: 'http://54.94.70.82:8080/Option',
  // apiProductProduct: 'http://54.94.70.82:8080/Product',
  // apiProductTag: 'http://54.94.70.82:8080/Tag',
  // apiProductVariant: 'http://54.94.70.82:8080/Variant',

  // apiOrderCoupon: 'http://54.94.70.82:8081/Coupon',
  // apiOrderPurchaseOrder: 'http://54.94.70.82:8081/PurchaseOrder',
  // apiOrderPurchaseOrderStatus: 'http://54.94.70.82:8081/PurchaseOrderStatus',

  // apiWebpayClient: 'http://54.94.70.82:8090/WebpayPlus',

  // apiAuthUserAccount: 'http://54.94.70.82:8082/UserAccount'

  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
