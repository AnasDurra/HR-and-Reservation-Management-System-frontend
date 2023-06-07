import { createSlice } from "@reduxjs/toolkit";

export const jobVacanciesReducer = createSlice({
    name: 'jobVacanciesReducer',
    initialState: {
        jobVacancies: [],
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getJobVacancies: (state) => {
            state.loading = true;
            state.error = null;
        },
        getJobVacanciesSuccess: (state, action) => {
            state.jobVacancies = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getJobVacanciesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        addJobVacancy: (state) => {
            state.loading = true;
            state.error = null;
        },
        addJobVacancySuccess: (state, action) => {
            const jobVacanciesAfterCreate = state.jobVacancies.concat(action.payload);
            state.loading = false;
            state.jobVacancies = jobVacanciesAfterCreate;
        },
        addJobVacancyFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteJobVacancy: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteJobVacancySuccess: (state, action) => {
            const jobVacanciesAfterDelete = state.jobVacancies.filter((job) => job.id !== action.payload.id);
            state.jobVacancies = jobVacanciesAfterDelete;
            state.loading = false;
        },
        deleteJobVacancyFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateJobVacancy: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateJobVacancySuccess: (state, action) => {
            const jobVacanciesAfterUpdate = state.jobVacancies.map((job) => job.id !== action.payload.id ? job : action.payload);
            state.jobVacancies = jobVacanciesAfterUpdate;
            state.loading = false;
        },
        updateJobVacancyFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getJobVacancies,
    getJobVacanciesSuccess,
    getJobVacanciesFailed,
    addJobVacancy,
    addJobVacancySuccess,
    addJobVacancyFailed,
    updateJobVacancy,
    updateJobVacancySuccess,
    updateJobVacancyFailed,
    deleteJobVacancy,
    deleteJobVacancySuccess,
    deleteJobVacancyFailed
} = jobVacanciesReducer.actions;

export default jobVacanciesReducer.reducer;