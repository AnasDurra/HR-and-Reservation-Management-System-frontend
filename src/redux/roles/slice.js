import { createSlice } from "@reduxjs/toolkit";

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    permissions: [],
    loading: false,
    error: null,
  },
  reducers: {
    createRole: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRoleSuccess: (state, action) => {
      state.loading = false;
      state.roles.push(action.payload.role);
    },
    createRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getRoles: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload.roles;
    },
    getRolesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    getPermissions: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPermissionsSuccess: (state, action) => {
      state.loading = false;
      state.permissions = action.payload.permissions;
    },
    getPermissionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateRole: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRoleSuccess: (state, action) => {
      state.loading = false;
      state.roles = state.roles.map((role) =>
        role.dep_id !== action.payload.role.role_id ? role : action.payload.role
      );
    },
    updateRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    destroyRole: (state) => {
      state.loading = true;
      state.error = null;
    },
    destroyRoleSuccess: (state, action) => {
      state.loading = false;
      state.roles = state.roles.filter(
        (role) => role.job_title_id !== action.payload.role.job_title_id
      );
    },
    destroyRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  createRole,
  createRoleSuccess,
  createRoleFail,
  getRoles,
  getRolesSuccess,
  getRolesFail,
  getPermissions,
  getPermissionsSuccess,
  getPermissionsFail,
  updateRole,
  updateRoleSuccess,
  updateRoleFail,
  destroyRole,
  destroyRoleSuccess,
  destroyRoleFail,
} = rolesSlice.actions;

export default rolesSlice.reducer;
