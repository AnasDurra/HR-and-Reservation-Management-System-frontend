import { createSlice } from "@reduxjs/toolkit";

export const biometricDevicesReducer = createSlice({
    name: 'biometricDevicesReducer',
    initialState: {
        devices: [],
        loading: false,
        error: null,
    },
    reducers: {
        getDevices: (state) => {
            state.loading = true;
            state.error = null;
        },
        getDevicesSuccess: (state, action) => {
            state.devices = action.payload;
            state.loading = false;
        },
        getDevicesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        createDevice: (state) => {
            state.loading = true;
            state.error = null;
        },
        createDeviceSuccess: (state, action) => {
            state.loading = false;
            state.shifts = state.devices.concat(action.payload);
        },
        createDeviceFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        deleteDevice: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteDeviceSuccess: (state, action) => {
            state.loading = false;
            const devicesAfterDelete = state.devices.filter((device) => device.id !== action.payload.id);
            state.devices = devicesAfterDelete;
        },
        deleteDeviceFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateDevice: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateDeviceSuccess: (state, action) => {
            state.loading = false;
            const devicesAfterUpdate = state.devices.map((device) => device.id !== action.payload.id ? device : action.payload);
            state.devices = devicesAfterUpdate;
        },
        updateDeviceFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getDevices,
    getDevicesSuccess,
    getDevicesFailed,
    createDevice,
    createDeviceSuccess,
    createDeviceFailed,
    deleteDevice,
    deleteDeviceSuccess,
    deleteDeviceFailed,
    updateDevice,
    updateDeviceSuccess,
    updateDeviceFailed
} = biometricDevicesReducer.actions;

export default biometricDevicesReducer.reducer;