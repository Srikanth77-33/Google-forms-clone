import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Questions } from "../components/view";
import { lighten } from "polished";
import { FormTitle } from "../components/common";
import {
  addResponse,
  setIsSubmitted,
  useSelector,
  useDispatch,
  getTheme,
  getFormData,
  getIsSubmitted,
} from "../store";

const View = () => {
  let id = useParams().id;
  const dispatch = useDispatch();

  const theme = useSelector(getTheme(id));
  const isSubmitted = useSelector(getIsSubmitted());
  const formData = useSelector(getFormData(id));

  const handleSubmit = (e) => {
    e.preventDefault();

    let response = [];
    let targetIndex = 0;

    formData.inputs.forEach((input) => {
      let inputRes = {
        type: input.type,
        question: input.question,
        required: input.required,
      };
      if (input.type === "multiple-choice" || input.type === "checkboxes") {
        inputRes.ans = [];
        input.options.forEach((option) => {
          inputRes.ans.push({
            option: option,
            value: e.target[targetIndex].checked,
          });
          targetIndex += 1;
        });
      } else {
        inputRes.ans = e.target[targetIndex].value;
        targetIndex += 1;
      }

      response.push(inputRes);
    });

    dispatch(addResponse({ formId: id, response: [...response] }));
    dispatch(setIsSubmitted({ isSubmitted: true }));
  };

  return (
    <StyledDiv
      as="form"
      style={{ backgroundColor: lighten(0.5, theme) }}
      onSubmit={handleSubmit}
    >
      <FormTitle
        title={formData.title}
        description={formData.description}
        isSubmitted={isSubmitted}
        formId={id}
      />
      <Questions formData={formData} isSubmitted={isSubmitted} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  min-height: 80vh;
  margin-top: 100px;
  padding-bottom: 64px;
  padding-top: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default View;
