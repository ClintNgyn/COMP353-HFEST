import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
  name: "employee",
  initialState: { employee: null },
  reducers: {
    setEmployee: (state, action) => {
      return {
        ...state,
        person: action.payload,
      };
    },
  },
});
export const { setEmployee } = employeeSlice.actions; //for dispatch
export default employeeSlice.reducer; //for configureStore
