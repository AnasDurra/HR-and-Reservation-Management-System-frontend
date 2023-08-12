import { createSlice } from '@reduxjs/toolkit';

export const ConsultingAppointments = createSlice({
  name: 'consulting appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {
    createAppointments: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments.push(action.payload.appointments);
    },
    createAppointmentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getAppointments: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload.appointments;
    },
    getAppointmentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateAppointment: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAppointmentSuccess: (state, action) => {
      state.loading = false;
      const appointmentIndex = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.appointment.id
      );
      if (appointmentIndex != -1) {
        state.appointments[appointmentIndex] = action.payload.appointment;
      }
    },
    updateAppointmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    destroyAppointment: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointments = state.appointments.filter((app) => app.id != action.payload.appointment.id);
    },
    destroyAppointmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  createAppointments,
  createAppointmentsSuccess,
  createAppointmentsFail,

  getAppointments,
  getAppointmentsSuccess,
  getAppointmentsFail,

  updateAppointment,
  updateAppointmentSuccess,
  updateAppointmentFail,

  destroyAppointment,
  destroyAppointmentSuccess,
  destroyAppointmentFail,
} = ConsultingAppointments.actions;

export default ConsultingAppointments.reducer;
