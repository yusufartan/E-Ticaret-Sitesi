import { createSlice } from "@reduxjs/toolkit";


const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}




export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                const extractedProducts = state.products.filter((product) => product.id != action.payload.id);
                findProduct.count += action.payload.count;
                state.products = [...extractedProducts, findProduct];
                writeFromBasketToStorage(state.products);
            }
            else {
                state.products = [...state.products, action.payload];
                writeFromBasketToStorage(state.products);
            }
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateBasket: (state) => {
            state.totalAmount = state.products.reduce((acc, product) => {
                return acc + Number(product.price) * product.count;
            }, 0)
        },
        removeItemToBasket: (state, action) => {
            const updateBasket = state.products && state.products.filter(product => {
               return product.id != action.payload;
            })
            state.products = updateBasket;
            writeFromBasketToStorage(state.products);

        }

    }
})

export const { addToBasket, setDrawer, calculateBasket, removeItemToBasket } = basketSlice.actions;

export default basketSlice.reducer
