import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formSlice",
  initialState: [],
  reducers: {
    createBlankForm(state, { payload }) {
      state.push({
        id: payload,
        title: "Untitled form",
        description: "",
        theme: '#673ab7',
        inputs: [
          {
            type: "multiple-choice",
            question: "",
            options: ["option 1"],
            required: false,
          },
        ],
      });
    },
    deleteForm(state, { payload }) {
      state.splice(payload.formIndex, 1);
    },

    updateTitle(state, { payload }) {
      const { formId, title } = payload;
      state[state.findIndex(({ id }) => id === formId)].title = title;
    },
    updateDescription(state, { payload }) {
      const { formId, description } = payload;
      state[state.findIndex(({ id }) => id === formId)].description =
        description;
    },

    createInput(state, { payload }) {
      const { formId, editQuestionIndex } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs.splice(
        editQuestionIndex + 1,
        0,
        {
          type: "multiple-choice",
          question: "",
          options: ["option 1"],
          required: false,
        }
      );
    },
    deleteInput(state, { payload }) {
      const { formId, inputIndex } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs.splice(
        inputIndex,
        1
      );
    },

    changeType(state, { payload }) {
      const { formId, inputIndex, inputType } = payload;
      let indOfForm = state.findIndex(({ id }) => id === formId);
      state[indOfForm].inputs[inputIndex].type = inputType;
    },
    changeRequired(state, { payload }) {
      const { formId, inputIndex, required } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs[
        inputIndex
      ].required = required;
    },
    updateQuestion(state, { payload }) {
      const { formId, inputIndex, question } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs[
        inputIndex
      ].question = question;
    },
    addOption(state, { payload }) {
      const { formId, inputIndex, option } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs[
        inputIndex
      ].options.push(option);
    },
    deleteOption(state, { payload }) {
      const { formId, inputIndex, optionIndex } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs[
        inputIndex
      ].options.splice(optionIndex, 1);
    },
    updateOption(state, { payload }) {
      const { formId, inputIndex, optionIndex, option } = payload;
      state[state.findIndex(({ id }) => id === formId)].inputs[
        inputIndex
      ].options[optionIndex] = option;
    },
    changeTheme( state, { payload }) {
      const { formId, theme } = payload;
      state[state.findIndex(({ id }) => id === formId)].theme = theme;
    }
  },
});

export const actions = formSlice.actions;

export default formSlice;
