import { createSlice } from "@reduxjs/toolkit";
const infectedSlice = createSlice({
  name: "infected",
  initialState: { infected: null },
  reducers: {
    setInfected: (state, action) => {
      return {
        ...state,
        infected: action.payload,
      };
    },
  },
});
export const { setInfected } = infectedSlice.actions; //for dispatch
export default infectedSlice.reducer; //for configureStore
