import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    isFetched: false,

    addProduct: (data) => 
        set((state) => ({
            products: [...state.products, data]
        })),
    setProducts: (data) => 
        set((state) => ({
            products: data,
            isFetched: true,
        })),
    updateProduct: (data) => 
        set((state) => ({
            products: state.products.map((product) => (
                product.product_id === data.product_id ? 
                {...product, ...data} : product
            ))
        })),
    removeProduct: (id) => 
        set((state) => ({
            products: state.products.filter(product => product.product_id !== id)
        }))
}))