import { create } from "zustand";

export const useStore = create((set) => ({
  cartArray: [],
  cartLoading: false,
}));
