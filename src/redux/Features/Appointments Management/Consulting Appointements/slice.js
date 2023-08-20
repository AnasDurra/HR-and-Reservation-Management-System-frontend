import { createSlice } from '@reduxjs/toolkit';

export const consultingAppointmentsSlice = createSlice({
  name: 'consulting appointments',
  initialState: {
    appointments: [],
    cancelledAppointments: [],
    caseNote: null,
    meta: null,
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
      state.appointments.push(...action.payload.appointments);
    },
    createAppointmentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    createPhoneReservation: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPhoneReservationSuccess: (state, action) => {
      state.loading = false;
      const appointmentIndex = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.appointment.id
      );
      if (appointmentIndex != -1) {
        state.appointments[appointmentIndex] = action.payload.appointment;
      }
    },
    createPhoneReservationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    createCaseNote: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCaseNoteSuccess: (state, action) => {
      state.loading = false;
      state.caseNote = action.payload.caseNote;
    },
    createCaseNoteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getConsultantAppointments: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConsultantAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload.appointments;
    },
    getConsultantAppointmentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getCancelledConsultingAppointments: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCancelledConsultingAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.cancelledAppointments = action.payload.appointments;
      state.meta = action.payload.meta;
    },
    getCancelledConsultingAppointmentsFail: (state, action) => {
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

    getCaseNote: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCaseNoteSuccess: (state, action) => {
      state.loading = false;
      state.caseNote = action.payload.caseNote;
    },
    getCaseNoteFail: (state, action) => {
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
        (appointment) => appointment.id === action.payload.appointment?.id
      );
      if (appointmentIndex != -1) {
        state.appointments[appointmentIndex] = action.payload.appointment;
      }
    },
    updateAppointmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateCaseNote: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCaseNoteSuccess: (state, action) => {
      state.loading = false;
      state.caseNote = action.payload.caseNote;
    },
    updateCaseNoteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    cancelReservation: (state) => {
      state.loading = true;
      state.error = null;
    },
    cancelReservationSuccess: (state, action) => {
      state.loading = false;
      const appointmentIndex = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.appointment.id
      );
      if (appointmentIndex != -1) {
        state.appointments[appointmentIndex] = action.payload.appointment;
      }
    },
    cancelReservationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    cancelAppointment: (state) => {
      state.loading = true;
      state.error = null;
    },
    cancelAppointmentSuccess: (state, action) => {
      state.loading = false;
      const appointmentIndex = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.appointment.id
      );
      if (appointmentIndex != -1) {
        state.appointments[appointmentIndex] = action.payload.appointment;
      }
    },
    cancelAppointmentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  createAppointments,
  createAppointmentsSuccess,
  createAppointmentsFail,

  createPhoneReservation,
  createPhoneReservationSuccess,
  createPhoneReservationFail,

  createCaseNote,
  createCaseNoteSuccess,
  createCaseNoteFail,

  getConsultantAppointments,
  getConsultantAppointmentsSuccess,
  getConsultantAppointmentsFail,

  getCancelledConsultingAppointments,
  getCancelledConsultingAppointmentsSuccess,
  getCancelledConsultingAppointmentsFail,

  getAppointments,
  getAppointmentsSuccess,
  getAppointmentsFail,

  getCaseNote,
  getCaseNoteSuccess,
  getCaseNoteFail,

  updateAppointment,
  updateAppointmentSuccess,
  updateAppointmentFail,

  updateCaseNote,
  updateCaseNoteSuccess,
  updateCaseNoteFail,

  cancelReservation,
  cancelReservationSuccess,
  cancelReservationFail,

  cancelAppointment,
  cancelAppointmentSuccess,
  cancelAppointmentFail,
} = consultingAppointmentsSlice.actions;

export default consultingAppointmentsSlice.reducer;
