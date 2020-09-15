import { Variant } from './variant.model';
import { Option } from './option.model';
import { ProductMaterial } from './product-material.model';
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
    isSale?: boolean;
    discountPercentage?: number;
    currentBasePrice?: number;
    currentTotalPrice?: number;
    stock?: number;
    isActive?: boolean;
    created?: string;
    modified?: string;
    brand?: Brand;
    collection?: Collection;
    images?: Image[];
    categories?: Category[];
    tags?: Tag[];
    productMaterials?: ProductMaterial[];
    options?: Option[];
    variants?: Variant[];
    // extra:
    quantity?: number;
    coupon?: Coupon;
}