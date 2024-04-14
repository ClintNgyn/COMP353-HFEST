import { createSlice } from "@reduxjs/toolkit";
const personSlice = createSlice({
  name: "residence",
  initialState: { residence: null },
  reducers: {
    setResidence: (state, action) => {
      return {
        ...state,
        residence: action.payload,
      };
    },
  },
});
export const { setResidence } = personSlice.actions; //for dispatch
export default personSlice.reducer; //for configureStore
