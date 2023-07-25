import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: 'userReducer',
    initialState: {
        user: null,
        permissions: [],
        loading: false,
        error: null,
    },
    reducers: {
        login: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state, action) => {
            state.user = null;
            state.permissions = [];
            state.loading = false;
        },
        logoutFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getEmployeePermissions: (state) => {
            state.loading = true;
            state.error = null;
        },
        getEmployeePermissionsSuccess: (state, action) => {
            const permissions = action.payload.map(p => p.perm_id);
            state.permissions = permissions;
            state.loading = false;
        },
        getEmployeePermissionsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    login,
    loginSuccess,
    loginFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    getEmployeePermissions,
    getEmployeePermissionsSuccess,
    getEmployeePermissionsFailed
} = userReducer.actions;

export default userReducer.reducer;