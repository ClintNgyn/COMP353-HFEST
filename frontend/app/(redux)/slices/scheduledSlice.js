import { createSlice } from "@reduxjs/toolkit";
const scheduledSlice = createSlice({
  name: "scheduler",
  initialState: { scheduler: null },
  reducers: {
    setScheduled: (state, action) => {
      return {
        ...state,
        scheduled: action.payload,
      };
    },
  },
});
export const { setScheduled } = scheduledSlice.actions; //for dispatch
export default scheduledSlice.reducer; //for configureStore
