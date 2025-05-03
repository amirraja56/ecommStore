import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});
const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUS.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        
    },
});

export const { setProducts,setStatus } = productSlice.actions;
export default productSlice.reducer;


         //  thungs
export function fetchProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const res = await fetch(`${process.env.REACT_APP_PRODUCT_API}`);
            // console.log("Raw response:", res);
       
            const data = await res.json();
            // console.log("Parsed data:", data); 
            dispatch(setProducts(data));
            dispatch(setStatus(STATUS.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
