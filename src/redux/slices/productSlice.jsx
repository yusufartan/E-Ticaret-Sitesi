import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    error: null,
};

// 🔹 TÜM ÜRÜNLERİ ÇEK
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
});

// 🔹 TEK ÜRÜNÜ ÇEK (sayfa yenilemede kullanılacak)
export const getProductById = createAsyncThunk("getProductById", async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔹 TÜM ÜRÜNLER
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // 🔹 TEK ÜRÜN
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { selectProduct } = productSlice.actions;
export default productSlice.reducer;
