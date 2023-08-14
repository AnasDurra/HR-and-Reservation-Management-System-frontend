import { createSlice } from "@reduxjs/toolkit";

export const customersReducer = createSlice({
    name: 'customersReducer',
    initialState: {
        customers: [],
        customer: null,
        educational_levels: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getCustomers: (state) => {
            state.customer = null;
            state.loading = true;
            state.error = null;
        },
        getCustomersSuccess: (state, action) => {
            state.customers = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getCustomersFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getEducationalLevels: (state) => {
            state.loading = true;
            state.error = null;
        },
        getEducationalLevelsSuccess: (state, action) => {
            state.educational_levels = action.payload.data;
            state.loading = false;
        },
        getEducationalLevelsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addCustomer: (state) => {
            state.customer = null;
            state.loading = true;
            state.error = null;
        },
        addCustomerSuccess: (state, action) => {
            const customersAfterCreate = state.customers.concat(action.payload);
            state.loading = false;
            state.customers = customersAfterCreate;
        },
        addCustomerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteCustomer: (state) => {
            state.customer = null;
            state.loading = true;
            state.error = null;
        },
        deleteCustomerSuccess: (state, action) => {
            const customersAfterDelete = state.customers.filter((c) => c.id !== action.payload.id);
            state.customers = customersAfterDelete;
            state.loading = false;
        },
        deleteCustomerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateCustomer: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateCustomerSuccess: (state, action) => {
            const customersAfterUpdate = state.customers.map((c) => c.id !== action.payload.id ? c : action.payload);
            state.customers = customersAfterUpdate;
            state.loading = false;
        },
        updateCustomerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getCustomer: (state) => {
            state.loading = true;
            state.error = null;
        },
        getCustomerSuccess: (state, action) => {
            state.customer = action.payload;
            state.loading = false;
        },
        getCustomerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        cahngeCustomerAccountActiveState: (state) => {
            state.loading = true;
            state.error = null;
        },
        cahngeCustomerAccountActiveStateSuccess: (state, action) => {
            state.customer = action.payload;
            state.loading = false;
        },
        cahngeCustomerAccountActiveStateFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getCustomers,
    getCustomersSuccess,
    getCustomersFailed,
    addCustomer,
    addCustomerSuccess,
    addCustomerFailed,
    deleteCustomer,
    deleteCustomerSuccess,
    deleteCustomerFailed,
    updateCustomer,
    updateCustomerSuccess,
    updateCustomerFailed,
    getCustomer,
    getCustomerSuccess,
    getCustomerFailed,
    getEducationalLevels,
    getEducationalLevelsSuccess,
    getEducationalLevelsFailed,
    cahngeCustomerAccountActiveState,
    cahngeCustomerAccountActiveStateSuccess,
    cahngeCustomerAccountActiveStateFailed,
} = customersReducer.actions;

export default customersReducer.reducer;