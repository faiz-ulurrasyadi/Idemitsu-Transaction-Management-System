import { create } from "zustand";

export const userCart = create((set) => ({
    cart: "none",
    setCart: () => set((state) => ({
        cart: "hoho",
    }))
}))