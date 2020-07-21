import { Tax } from './tax.model';
import { Product } from './product.model';
import { PurchaseOrderStatus } from './purchase-order-status.model';
import { PurchaseOrderSummary } from './purchase-order-summary.model';
import { Coupon } from './coupon.model';

export interface PurchaseOrder {
    idPurchaseOrder?: number;
    code?: string;
    isOrderPaid?: boolean;
    created?: string;
    modified?: string;
    msUserAccountsIdAccount?: number;
    purchaseOrderSummary?: PurchaseOrderSummary;
    purchaseOrderStatus?: PurchaseOrderStatus;
    coupon?: Coupon;
    products?: Product[];
    taxes?: Tax[];
}