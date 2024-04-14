import { configureStore } from "@reduxjs/toolkit";

import pReducer from "./slices/personSlice";
import eReducer from "./slices/personSlice";
import fReducer from "./slices/facilitySlice";
import rReducer from "./slices/residenceSlice";
import sReducer from "./slices/scheduledSlice";
import vReducer from "./slices/vaccinatedSlice";
import iReducer from "./slices/infectedSlice";

export default configureStore({
  reducer: {
    person: pReducer,
    employee: eReducer,
    facility: fReducer,
    residence: rReducer,
    scheduled: sReducer,
    vaccinated: vReducer,
    infected: iReducer,
  },
});
