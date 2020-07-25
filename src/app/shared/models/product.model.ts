import { Tag } from './tag.model';
import { Category } from './category.model';
import { Collection } from './collection.model';
import { Brand } from './brand.model';
import { Image } from './image.model';
import { Coupon } from './coupon.model';

export interface Product {
    idProduct?: number;
    barcode?: string;
    title?: string;
    description?: string;
    isNew?: boolean;
    rating?: number;
    price?: number;
    isSale?: number;
    discountPercentage?: number;
    priceDiscount?: number;
    stock?: number;
    isActive?: boolean;
    created?: string;
    modified?: string;
    image?: Image;
    brand?: Brand;
    collection?: Collection;
    images?: Image[];
    categories?: Category[];
    tags?: Tag[];
    quantity?: number;
    coupon?: Coupon;
    variants?: any[];
}