import { createSlice } from "@reduxjs/toolkit";

export const eventsReducer = createSlice({
    name: 'eventsReducer',
    initialState: {
        events: [],
        event: null,
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {
        getEvents: (state) => {
            state.event = null;
            state.loading = true;
            state.error = null;
        },
        getEventsSuccess: (state, action) => {
            state.events = action.payload.data;
            delete action.payload.data;
            state.metaData = action.payload.meta;
            state.loading = false;
        },
        getEventsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        addEvent: (state) => {
            state.event = null;
            state.loading = true;
            state.error = null;
        },
        addEventSuccess: (state, action) => {
            const eventsAfterCreate = state.events.concat(action.payload);
            state.loading = false;
            state.events = eventsAfterCreate;
        },
        addEventFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteEvent: (state) => {
            state.event = null;
            state.loading = true;
            state.error = null;
        },
        deleteEventSuccess: (state, action) => {
            const eventsAfterDelete = state.events.filter((e) => e.id !== action.payload.id);
            state.events = eventsAfterDelete;
            state.loading = false;
        },
        deleteEventFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateEvent: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateEventSuccess: (state, action) => {
            const eventsAfterUpdate = state.events.map((e) => e.id !== action.payload.id ? e : action.payload);
            state.events = eventsAfterUpdate;
            state.loading = false;
        },
        updateEventFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getEvent: (state) => {
            state.loading = true;
            state.error = null;
        },
        getEventSuccess: (state, action) => {
            state.event = action.payload;
            state.loading = false;
        },
        getEventFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getEvents,
    getEventsSuccess,
    getEventsFailed,
    addEvent,
    addEventSuccess,
    addEventFailed,
    deleteEvent,
    deleteEventSuccess,
    deleteEventFailed,
    updateEvent,
    updateEventSuccess,
    updateEventFailed,
    getEvent,
    getEventSuccess,
    getEventFailed,
} = eventsReducer.actions;

export default eventsReducer.reducer;