import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartData : [],
    userInfo : false
}

export const fastSlice = createSlice({
    name : "fast",
    initialState,
    reducers : {
        // panier
        addToCart : (state, action) => {
            const product = state.cartData.find((product) => product.id === action.payload.id)
            if (product) {
                product.qty += action.payload.qty 
            } else {
                state.cartData.push(action.payload)
            }
        },
        increamentQty : (state, action) => {
            const product = state.cartData.find((product) => product.id === action.payload.id)
            if (product) {
                product.qty += 1
            }
        },
        decreamentQty : (state, action) => {
            const product = state.cartData.find((product) => product.id === action.payload.id)
            if (product.qty > 1) {
                product.qty -= 1
            } else {
                state.cartData = state.cartData.filter((product) => product.id !== action.payload.id)
            }
        },
        deleteProduct : (state, action) => {
            const product = state.cartData.find((product) => product.id == action.payload.id)
            if (product) {
                state.cartData = state.cartData.filter((product) => product.id !== action.payload.id)
            }
        },
          // gestion User
          addUser : (state, action) => {
            state.userInfo = action.payload
        },
        logOut : (state) => {
            state.userInfo = null
        },
    }
})

export const {
    addToCart,
    increamentQty,
    decreamentQty,
    deleteProduct,
    addUser,
    logOut
} = fastSlice.actions

export default fastSlice.reducer

