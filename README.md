# Grocery Store (Simple)

A simple, responsive grocery store web app built with React and Redux Toolkit. It demonstrates a clean product listing, filters, a cart powered by Redux Toolkit, mobile-friendly filter drawer, and toast notifications for user actions.

> Built as a learning project — perfect for practising React, Redux Toolkit, and Tailwind CSS.

---

## ✨ Features

* Product listing with search, category filter and price range
* Responsive design with a desktop sidebar and a mobile filter drawer
* Add to cart using Redux Toolkit (`addItem`, `updateQty`, `removeItem`)
* Cart drawer with increase / decrease item quantity and subtotal calculation
* Empty-cart friendly animation and a clear CTA to continue shopping
* Toast notifications for add / remove actions (react-toastify)
* Clean folder structure and reusable components (ProductCard, CartComp, FilterBar)

---

## 🧭 Tech stack

* React
* Redux Toolkit
* React Router
* Tailwind CSS (or plain CSS — adjust as needed)
* react-toastify (notifications)
* lucide-react / react-icons (icons)

---

## 🚀 Getting started

### Prerequisites

* Node.js v16+ and npm or yarn installed

### Install

```bash
# clone repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# using npm
npm install

# using yarn
# yarn
```

### Run locally

```bash
# start dev server
npm run dev
# or
# yarn dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port your dev server uses).

### Build for production

```bash
npm run build
# or
# yarn build
```

---

## 📁 Suggested folder structure

```
src/
├─ assets/           # images, icons, SVGs
├─ components/       # ProductCard, CartComp, FilterBar, Navbar, etc.
├─ pages/            # Shop, Home, About
├─ Redux/            # cartSlice.js, store.js
├─ Utils/            # Data.js (sample products)
├─ App.jsx
└─ index.jsx
```

---

## 🧩 Redux slice (example)

A small example of the `cartSlice` used in the project:

```js
// src/Redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const existing = state.cart.find(i => i.id === item.id)
      if (existing) existing.qty = (existing.qty ?? 1) + (item.qty ?? 1)
      else state.cart.push({ ...item, qty: item.qty ?? 1 })
    },
    updateQty(state, action) {
      const { id, qty } = action.payload
      const item = state.cart.find(i => i.id === id)
      if (item) item.qty = qty
    },
    removeItem(state, action) {
      state.cart = state.cart.filter(i => i.id !== action.payload)
    },
    clearCart(state) { state.cart = [] }
  }
})

export const { addItem, updateQty, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
```

---

## ✅ Tips & Notes

* Keep a consistent quantity field name (`qty`) across the app — don’t reuse `unit` for numeric counts.
* Use Redux DevTools to inspect actions and state while debugging.
* Persist cart to `localStorage` if you want items to survive reload. Example: subscribe to store and write `localStorage.setItem('cart', JSON.stringify(store.getState().cart))`.

---

## ✉️ Contact


`Made with ❤️ by Pankaj`
