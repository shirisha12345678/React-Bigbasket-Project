import { configureStore, createSlice } from '@reduxjs/toolkit';
// import MilkItems from './MilkItems';
import Cart from "./Cart";

// local cart from local storage//
      const savedCart = localStorage.getItem("Cart");
      const localStorageCart = savedCart? JSON.parse(savedCart):[];

let productsSlice = createSlice({
  name: 'products',
  initialState: {
    vegItems: [
      { name: 'tomato', price: '50.5', image: '/tomato.jpg' },
      { name: 'potato', price: '30.5', image: '/potato.jpg' },
      { name: 'carrot', price: '250.5', image: '/carrot.jpg' },
      { name: 'onion', price: '180.5', image: '/onion.jpg' },
      { name: 'cabbage', price: '120.0', image: '/cabbage.jpg' },
      { name: 'beans', price: '40.0', image: '/beans.jpg' },
      { name: 'capsicum', price: '170.5', image: '/capsicum.jpg' },
      { name: 'cauliflower', price: '160.0', image: '/cauliflower.jpg' },
      { name: 'beetroot', price: '190.0', image: '/beetroot.jpg' },
      { name: 'brinjal', price: '145.5', image: '/brinjal.jpg' },
      { name: 'dondakaya', price: '145.5', image: '/dondakaya.jpg' },
      { name: 'kakarkaya', price: '145.5', image: '/kakarkaya.jpg' },
      { name: 'mulakkai', price: '145.5', image: '/mulakkai.jpg' },
      { name: 'mirchi', price: '145.5', image: '/mirchi.jpg' },
      { name: 'bottle gourd', price: '145.5', image: '/bottle gourd.jpg' },
      { name: 'spine gourd', price: '145.5', image: '/spine gourd.jpg' },
      { name: 'dosakaya', price: '145.5', image: '/dosakaya.jpg' },

    ],

    NonVeg: [
      { name: 'Chicken', price: '250.5', image: '/chicken.jpg' },
      { name: 'mutton', price: '500.5', image: '/mutton.jpg' },
      { name: 'fish', price: '300.5', image: '/fish.jpg' },
      { name: 'prawns', price: '400.5', image: '/prawns.jpg' },
      { name: 'pork', price: '600.5', image: '/pork.jpg' },
      { name: 'crab', price: '800.5', image: '/crab.jpg' },
      { name: 'chickenbiryani', price: '700.5', image: '/chickenbiryani.jpg' },
      { name: 'muttonfry', price: '1000.5', image: '/muttonfry.jpg' },
      { name: 'eggfryrice', price: '1000.5', image: '/eggfryrice.jpg' },
      { name: 'boti', price: '1000.5', image: '/boti.jpg' }

    ],

   MilkItems: [
      { name: 'cowmilk', price: '1000.5', image: '/cowmilk.jpg' },
      { name: 'milkbread', price: '45', image: '/milkbread.jpg' },
      { name: 'paneer', price: '950', image: '/paneer.jpg' },
      { name: 'buttermilk', price: '40', image: '/buttermilk.jpg' },
      { name: 'ghee', price: '30', image: '/ghee.jpg' },
      { name: 'Dairy-Products', price: '30', image: '/Dairy-Products.jpg' },
      { name: 'butter', price: '30', image: '/butter.jpg' },
      { name: 'icecream', price: '30', image: '/icecream.jpg' },
      { name: 'freshmilk', price: '30', image: '/freshmilk.jpg' },
      { name: 'milkybar', price: '30', image: '/milkybar.jpg' }


    ],

    Chocolate: [
      { name: 'Dairy Milk', price: '50', image: '/dairymilk.jpg' },
      { name: 'KitKat', price: '40', image: '/kitkat.jpg' },
      { name: '5 Star', price: '30', image: '/5star.jpg' },
      { name: 'Perk', price: '20', image: '/perk.jpg' },
      { name: 'Munch', price: '1', image: '/munch.jpg' },
      { name: 'Snickers', price: '45', image: '/snickers.jpg' },
      { name: 'Milkybar', price: '25', image: '/milkybar.jpg' },
      { name: 'Ferrero Rocher', price: '200', image: '/ferrerorocher.jpg' },
      { name: 'Bournville', price: '85', image: '/bournville.jpg' },
      { name: 'Galaxy', price: '60', image: '/galaxy.jpg' }

    ],
    
  },
  reducers: {}
});

// // NEW: Cart Slic

const cartSlice = createSlice({
  name: 'cart',
  initialState: localStorageCart,
  reducers: {

    AddToCart:(state,inputItem) => {
      const item = state.find(item=>item.name === inputItem.payload.name);

      if(item){
          item.quantity +=1;
      }
      else {
          state.push({...inputItem.payload,quantity:1});
      }
  },

    IncrementItem: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    DecrementItem: (state, action) => {
      const idx = state.findIndex(i => i.name === action.payload.name);
      if (idx !== -1) {
        if (state[idx].quantity > 1) {
          state[idx].quantity -= 1;
        } else {
          state.splice(idx, 1);
        }
      }
    },
    // NEW: Remove the item entirely
    RemoveItem: (state, action) => {
      return state.filter(i => i.name !== action.payload.name);
    },
    clearCart: (state) => {
  return [];
}
  }
});


// orderSlice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});


// 5. Configure Store
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  }
});


// 6. Save cart to localStorage AFTER store is defined
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("Cart", JSON.stringify(state.cart));
});

export const { addOrder } = orderSlice.actions;

export const {AddToCart, IncrementItem, DecrementItem, RemoveItem, clearCart} = cartSlice.actions;


export default store;
