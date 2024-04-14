import { createSlice } from "@reduxjs/toolkit";
const vaccinatedSlice = createSlice({
  name: "vaccinated",
  initialState: { vaccinated: null },
  reducers: {
    setVaccinated: (state, action) => {
      return {
        ...state,
        vaccinated: action.payload,
      };
    },
  },
});
export const { setVaccinated } = vaccinatedSlice.actions; //for dispatch
export default vaccinatedSlice.reducer; //for configureStore
