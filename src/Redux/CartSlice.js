import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [] // each item: { id, name, price, image, qty, ... }
  },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    addItem(state, action) {
      const item = action.payload;
      const existing = state.cart.find(i => i.id === item.id);
      if (existing) {
        // increment qty
        existing.qty = (existing.qty ?? 1) + (item.qty ?? 1);
      } else {
        state.cart.push({ ...item, qty: item.qty ?? 1 });
      }
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const existing = state.cart.find(i => i.id === id);
      if (existing) existing.qty = qty;
    },
    removeItem(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter(i => i.id !== id);
    },
    clearCart(state) {
      state.cart = [];
    }
  }
});

export const { setCart, addItem, updateQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
