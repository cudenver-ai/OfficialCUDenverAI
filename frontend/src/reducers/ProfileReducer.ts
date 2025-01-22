import { SET_PROFILE, SET_LOADING, SET_ERROR } from "../actions/ProfileActions";

const initialState = {
  profile: {},
  loading: true,
  error: null,
};

const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profile: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default profileReducer;
