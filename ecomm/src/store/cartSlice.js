import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((items) => items.id !== action.payload);
        },
        increment(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {        
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    },
});

export const { add, remove, increment,decrement } = cartSlice.actions;
export default cartSlice.reducer;