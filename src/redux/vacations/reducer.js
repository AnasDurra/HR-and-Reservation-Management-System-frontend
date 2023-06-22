import { createSlice } from "@reduxjs/toolkit";

export const vacationsReducer = createSlice({
    name: 'vacationsReducer',
    initialState: {
        allVacations: [],
        vacationRequests: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getAllVacations: (state) => {
            state.metaData = null;
            state.loading = true;
            state.error = null;
        },
        getAllVacationsSuccess: (state, action) => {
            state.allVacations = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.pagination;
            state.loading = false;
        },
        getAllVacationsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addVacation: (state) => {
            state.loading = true;
            state.error = null;
        },
        addVacationSuccess: (state, action) => {
            console.log(action.payload);
            let newVacations = state.allVacations;
            newVacations.unshift(action.payload);
            state.allVacations = newVacations;
            state.loading = false;
        },
        addVacationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteVacation: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteVacationSuccess: (state, action) => {
            const newVacations = state.allVacations.filter((v) => v.employee_vacation_id !== action.payload.employee_vacation_id);
            state.allVacations = newVacations;
            state.loading = false;
        },
        deleteVacationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addVacationRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addVacationRequestSuccess: (state, action) => {
            state.loading = false;
        },
        addVacationRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getVacationRequests: (state) => {
            state.metaData = null;
            state.loading = true;
            state.error = null;
        },
        getVacationRequestsSuccess: (state, action) => {
            state.vacationRequests = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getVacationRequestsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        acceptVacationRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        acceptVacationRequestSuccess: (state, action) => {
            let requests = state.vacationRequests.map(r => {
                if (r.vacation_req_id === action.payload.vacation_req_id) {
                    r.req_stat = action.payload.req_stat;
                }
                return r;
            });

            state.loading = false;
            state.vacationRequests = requests;
        },
        acceptVacationRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        rejectVacationRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        rejectVacationRequestSuccess: (state, action) => {
            let requests = state.vacationRequests.map(r => {
                if (r.vacation_req_id === action.payload.vacation_req_id) {
                    r.req_stat = action.payload.req_stat;
                }
                return r;
            });

            state.loading = false;
            state.vacationRequests = requests;
        },
        rejectVacationRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getAllVacations,
    getAllVacationsSuccess,
    getAllVacationsFailed,
    addVacation,
    addVacationSuccess,
    addVacationFailed,
    deleteVacation,
    deleteVacationSuccess,
    deleteVacationFailed,
    addVacationRequest,
    addVacationRequestSuccess,
    addVacationRequestFailed,
    getVacationRequests,
    getVacationRequestsSuccess,
    getVacationRequestsFailed,
    acceptVacationRequest,
    acceptVacationRequestSuccess,
    acceptVacationRequestFailed,
    rejectVacationRequest,
    rejectVacationRequestSuccess,
    rejectVacationRequestFailed
} = vacationsReducer.actions;

export default vacationsReducer.reducer;