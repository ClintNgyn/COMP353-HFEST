import { createSlice } from "@reduxjs/toolkit";
const personSlice = createSlice({
  name: "person",
  initialState: { person: null },
  reducers: {
    setPerson: (state, action) => {
      return {
        ...state,
        person: action.payload,
      };
    },
  },
});
export const { setPerson } = personSlice.actions; //for dispatch
export default personSlice.reducer; //for configureStore
