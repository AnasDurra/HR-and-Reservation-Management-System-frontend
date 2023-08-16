import { createSlice } from "@reduxjs/toolkit";

export const clinicsReducer = createSlice({
    name: 'clinicsReducer',
    initialState: {
        clinics: [],
        loading: false,
        error: null,
    },
    reducers: {
        getClinics: (state) => {
            state.loading = true;
            state.error = null;
        },
        getClinicsSuccess: (state, action) => {
            state.clinics = action.payload.data;
            state.loading = false;
        },
        getClinicsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getClinics,
    getClinicsSuccess,
    getClinicsFailed
} = clinicsReducer.actions;

export default clinicsReducer.reducer;