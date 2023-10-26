import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import infoSlice from "./infoSlice";
import responseSlice from "./responseSlice";

const store = configureStore({
  reducer: {
    forms: formSlice.reducer,
    info: infoSlice.reducer,
    responses: responseSlice.reducer,
  },
});

export default store;
