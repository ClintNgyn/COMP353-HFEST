import { createSlice } from "@reduxjs/toolkit";
const facilitySlice = createSlice({
  name: "facility",
  initialState: { person: null },
  reducers: {
    setFacility: (state, action) => {
      return {
        ...state,
        facility: action.payload,
      };
    },
  },
});
export const { setFacility } = facilitySlice.actions; //for dispatch
export default facilitySlice.reducer; //for configureStore
