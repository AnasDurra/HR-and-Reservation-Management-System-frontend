import * as actionTypes from './constants';

const initialState = {
    roles: [],
    permissions: [],
    loading: false,
    error: null,
}

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROLES:
            return { ...state, loading: true, error: null };
        case actionTypes.GET_ROLES_SUCCESS:
            return { ...state, loading: false, roles: action.payload.roles };
        case actionTypes.GET_ROLES_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.GET_PERMISSIONS:
            return { ...state, loading: true, error: null };
        case actionTypes.GET_PERMISSIONS_SUCCESS:
            return { ...state, loading: false, permissions: action.payload.permissions };
        case actionTypes.GET_PERMISSIONS_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.DELETE_ROLE:
            return { ...state, loading: true, error: null };
        case actionTypes.DELETE_ROLE_SUCCESS:
            const rolesAfterDelete = state.roles.filter((role) => role.job_title_id !== action.payload.role.job_title_id);
            return { ...state, loading: false, roles: rolesAfterDelete };
        case actionTypes.DELETE_ROLE_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.UPDATE_ROLE:
            return { ...state, loading: true, error: null };
        case actionTypes.UPDATE_ROLE_SUCCESS:
            const rolesAfterUpdate = state.roles.map((role) => role.dep_id !== action.payload.role.role_id ? role : action.payload.role);
            return { ...state, loading: false, roles: rolesAfterUpdate };
        case actionTypes.UPDATE_ROLE_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        case actionTypes.CREATE_ROLE:
            return { ...state, loading: true, error: null };
        case actionTypes.CREATE_ROLE_SUCCESS:
            const rolesAfterCreate = state.roles.concat(action.payload.role);
            return { ...state, loading: false, roles: rolesAfterCreate };
        case actionTypes.CREATE_ROLE_FAILED:
            return { ...state, loading: false, error: action.payload.error };

        default:
            return state;
    }
}

export default rolesReducer;