export const SET_PROFILE = "SET_PROFILE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const setProfile = (news: any[]) => ({
  type: SET_PROFILE,
  payload: news,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string) => ({
  type: SET_ERROR,
  payload: error,
});
