import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import infoSlice from "./infoSlice";
import responseSlice from "./responseSlice";
import { useSelector, useDispatch } from "react-redux";
import { getTheme, getForms, getFormData } from "./formSlice";
import { getEditQuestionIndex, getTop, getIsSubmitted } from "./infoSlice";
import { getResponses } from "./responseSlice";

const store = configureStore({
  reducer: {
    forms: formSlice.reducer,
    info: infoSlice.reducer,
    responses: responseSlice.reducer,
  },
});

export const { setEditQuestionIndex, setTop, setIsSubmitted } =
  infoSlice.actions;

export const {
  createBlankForm,
  deleteForm,
  updateTitle,
  updateDescription,
  changeTheme,
  createInput,
  deleteInput,
  changeType,
  changeRequired,
  updateQuestion,
  addOption,
  deleteOption,
  updateOption,
} = formSlice.actions;

export const { addResponse, deleteResponse } = responseSlice.actions;

export {
  useSelector,
  useDispatch,
  getTheme,
  getForms,
  getEditQuestionIndex,
  getFormData,
  getTop,
  getResponses,
  getIsSubmitted
};

export default store;
