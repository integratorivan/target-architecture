import { addProductToCart } from '$shared/domain/cart/cart.model';
import type { CartProductModel } from '$shared/domain/cart/cart.types';
import type { ProductModel } from '$shared/domain/product/product.types';

type CartEntityDeps = {
    now: () => Date;
};

const defaultDeps: CartEntityDeps = {
    now: () => new Date(),
};

export const createCartEntity = (deps: CartEntityDeps = defaultDeps) => {
    const addProduct = (cart: CartProductModel[], product: ProductModel): CartProductModel[] => {
        return addProductToCart(product, cart, deps.now);
    };

    const removeProductById = (
        cart: CartProductModel[],
        productId: CartProductModel['id'],
    ): CartProductModel[] => {
        return cart.filter(({ id }) => id !== productId);
    };

    const hasProduct = (cart: CartProductModel[], productId: CartProductModel['id']): boolean => {
        return cart.some(({ id }) => id === productId);
    };

    return {
        addProduct,
        removeProductById,
        hasProduct,
    };
};
